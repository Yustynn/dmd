// Mode configurations
const modes = {
    metal: {
        name: "Metal Mode",
        colors: {
            primary: "#1a1a1a",
            secondary: "#ff0000", 
            accent: "#333333",
            text: "#ffffff"
        },
        fonts: {
            heading: "'Cinzel', serif",
            body: "'Roboto Condensed', sans-serif"
        },
        song: "https://www.soundjay.com/misc/sounds/metal-loop.mp3", // Placeholder - replace with actual metal song
        background: "radial-gradient(circle, #1a1a1a 0%, #000000 100%)"
    },
    girly: {
        name: "Girly Mode",
        colors: {
            primary: "#ff69b4",
            secondary: "#ffb6c1",
            accent: "#ffc0cb",
            text: "#8b008b"
        },
        fonts: {
            heading: "'Dancing Script', cursive",
            body: "'Quicksand', sans-serif"
        },
        song: "https://www.soundjay.com/misc/sounds/pop-loop.mp3", // Placeholder - replace with actual pop song
        background: "linear-gradient(45deg, #ffb6c1 0%, #ffc0cb 50%, #ff69b4 100%)"
    },
    retro: {
        name: "Retro Mode",
        colors: {
            primary: "#ff6b35",
            secondary: "#f7931e",
            accent: "#ffdc00",
            text: "#2c1810"
        },
        fonts: {
            heading: "'Righteous', cursive",
            body: "'Orbitron', monospace"
        },
        song: "https://www.soundjay.com/misc/sounds/retro-loop.mp3", // Placeholder - replace with actual retro song
        background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffdc00 100%)"
    },
    space: {
        name: "Space Mode",
        colors: {
            primary: "#0f3460",
            secondary: "#16537e",
            accent: "#533483",
            text: "#e94560"
        },
        fonts: {
            heading: "'Orbitron', monospace",
            body: "'Exo 2', sans-serif"
        },
        song: "https://www.soundjay.com/misc/sounds/ambient-loop.mp3", // Placeholder - replace with actual ambient space song
        background: "radial-gradient(ellipse at center, #0f3460 0%, #16537e 50%, #533483 100%)"
    }
};

// Current mode (will be randomized on load)
let currentMode = null;

// Poem data (will be modified based on mode)
const basePoemData = {
    title: "Nature's Symphony",
    subtitle: "A poem in three movements",
    stanzas: [
        {
            lines: [
                "In morning's light, the world awakens bright,",
                "With golden rays that chase away the night.",
                "The dew drops glisten on the emerald grass,",
                "As gentle breezes through the meadows pass."
            ],
            preferredImages: ["sunrise", "dawn", "morning"]
        },
        {
            lines: [
                "Through ancient woods where tall trees stand so proud,",
                "Their whispered secrets echo clear and loud.",
                "The dancing leaves create a symphony,",
                "Of nature's pure and timeless harmony."
            ],
            preferredImages: ["forest", "trees", "woods"]
        },
        {
            lines: [
                "As daylight fades to purple twilight's glow,",
                "The stars begin their nightly light show.",
                "In peaceful silence, nature finds its rest,",
                "Until tomorrow brings another blessed."
            ],
            preferredImages: ["sunset", "twilight", "evening"]
        }
    ]
};

// Mode-specific poem variations (will be replaced by JSON sampling)
const modePoems = {
    metal: {
        title: "Storm's Rage",
        subtitle: "A symphony of darkness"
    },
    girly: {
        title: "Fairy Dreams", 
        subtitle: "A tale of magic and wonder"
    },
    retro: {
        title: "Neon Nights",
        subtitle: "A blast from the past"
    },
    space: {
        title: "Cosmic Voyage",
        subtitle: "A journey through the stars"
    }
};

// Function to load and parse poem JSON
async function loadPoemData() {
    try {
        const response = await fetch('poem.json');
        const poemDatabase = await response.json();
        return poemDatabase;
    } catch (error) {
        console.error('Failed to load poem.json:', error);
        return null;
    }
}

// Function to sample verses from each act
function sampleVersesFromActs(poemDatabase) {
    if (!poemDatabase) return null;
    
    // Separate verses by act
    const act1Verses = poemDatabase.filter(verse => verse.act === 'ACT1');
    const act2Verses = poemDatabase.filter(verse => verse.act === 'ACT2');
    const act3Verses = poemDatabase.filter(verse => verse.act === 'ACT3');
    
    // Sample one verse from each act
    const selectedVerses = [];
    
    if (act1Verses.length > 0) {
        const randomAct1 = act1Verses[Math.floor(Math.random() * act1Verses.length)];
        selectedVerses.push({
            lines: randomAct1.text.split('\n'),
            act: 'ACT1',
            notes: randomAct1.notes,
            preferredImages: getImagesForAct('ACT1')
        });
    }
    
    if (act2Verses.length > 0) {
        const randomAct2 = act2Verses[Math.floor(Math.random() * act2Verses.length)];
        selectedVerses.push({
            lines: randomAct2.text.split('\n'),
            act: 'ACT2', 
            notes: randomAct2.notes,
            preferredImages: getImagesForAct('ACT2')
        });
    }
    
    if (act3Verses.length > 0) {
        const randomAct3 = act3Verses[Math.floor(Math.random() * act3Verses.length)];
        selectedVerses.push({
            lines: randomAct3.text.split('\n'),
            act: 'ACT3',
            notes: randomAct3.notes,
            ending_type: randomAct3.ending_type,
            preferredImages: getImagesForAct('ACT3')
        });
    }
    
    return selectedVerses;
}

// Function to get appropriate images for each act
function getImagesForAct(act) {
    switch(act) {
        case 'ACT1':
            return ['tech', 'digital', 'screens'];
        case 'ACT2': 
            return ['battle', 'chaos', 'conflict'];
        case 'ACT3':
            return ['resolution', 'peace', 'ending'];
        default:
            return ['abstract', 'artistic', 'modern'];
    }
}

// Get current poem data based on mode and JSON sampling
async function getPoemData() {
    const poemDatabase = await loadPoemData();
    const sampledVerses = sampleVersesFromActs(poemDatabase);
    
    if (!sampledVerses || sampledVerses.length === 0) {
        // Fallback to original poem if JSON fails
        return basePoemData;
    }
    
    // Get mode-specific title and subtitle
    const modeConfig = currentMode && modePoems[currentMode] ? modePoems[currentMode] : basePoemData;
    
    return {
        title: modeConfig.title || "Rachael's Story",
        subtitle: modeConfig.subtitle || "A digital nightmare in three acts",
        stanzas: sampledVerses
    };
}

// Image sources - expanded for different acts and modes
const imagePool = [
    // ACT 1 - Technology/Digital/Creation images
    {
        src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
        alt: "Digital technology screens",
        type: "tech"
    },
    {
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        alt: "Digital data visualization",
        type: "digital"
    },
    {
        src: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop",
        alt: "Multiple screens and displays",
        type: "screens"
    },
    
    // ACT 2 - Battle/Chaos/Conflict images  
    {
        src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        alt: "Chaotic storm and lightning",
        type: "battle"
    },
    {
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
        alt: "Industrial chaos and conflict", 
        type: "chaos"
    },
    {
        src: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop",
        alt: "Urban conflict scene",
        type: "conflict"
    },
    
    // ACT 3 - Resolution/Peace/Ending images
    {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        alt: "Peaceful resolution sunrise",
        type: "resolution"
    },
    {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        alt: "Tranquil peaceful scene",
        type: "peace"
    },
    {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
        alt: "Beautiful ending sunset",
        type: "ending"
    },
    
    // Metal mode images
    {
        src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
        alt: "Dark stormy sky with lightning",
        type: "storm"
    },
    {
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
        alt: "Dark industrial metal structure",
        type: "metal"
    },
    {
        src: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop",
        alt: "Gothic architecture in darkness",
        type: "gothic"
    },
    
    // Additional abstract/artistic images
    {
        src: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&h=600&fit=crop",
        alt: "Abstract artistic composition",
        type: "abstract"
    },
    {
        src: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
        alt: "Modern artistic scene",
        type: "artistic"
    },
    {
        src: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop",
        alt: "Contemporary modern art",
        type: "modern"
    },
    
    // Original nature images (fallback)
    {
        src: "images/sunrise.jpg",
        alt: "Beautiful sunrise over mountains",
        type: "sunrise"
    },
    {
        src: "images/forest.jpg",
        alt: "Peaceful forest path",
        type: "forest"
    },
    {
        src: "images/sunset.jpg",
        alt: "Peaceful sunset by the ocean",
        type: "sunset"
    },
    // Online backup images
    {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        alt: "Mountain sunrise landscape",
        type: "sunrise"
    },
    {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        alt: "Forest path through trees",
        type: "forest"
    },
    {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
        alt: "Ocean sunset scene",
        type: "sunset"
    },
    {
        src: "https://images.unsplash.com/photo-1464822759844-d150052efe7e?w=800&h=600&fit=crop",
        alt: "Mountain peak at dawn",
        type: "sunrise"
    },
    {
        src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
        alt: "Dense forest canopy",
        type: "forest"
    },
    {
        src: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&h=600&fit=crop",
        alt: "Peaceful lake at sunset",
        type: "sunset"
    }
];

// Function to select random mode
function selectRandomMode() {
    const modeKeys = Object.keys(modes);
    const randomIndex = Math.floor(Math.random() * modeKeys.length);
    currentMode = modeKeys[randomIndex];
    return currentMode;
}

// Function to apply mode styling
function applyModeStyles(mode) {
    const modeConfig = modes[mode];
    if (!modeConfig) return;
    
    // Create or update mode styles
    let modeStyleSheet = document.getElementById('mode-styles');
    if (!modeStyleSheet) {
        modeStyleSheet = document.createElement('style');
        modeStyleSheet.id = 'mode-styles';
        document.head.appendChild(modeStyleSheet);
    }
    
    // Add Google Fonts import
    let fontLink = document.getElementById('mode-fonts');
    if (!fontLink) {
        fontLink = document.createElement('link');
        fontLink.id = 'mode-fonts';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }
    
    // Set font imports based on mode
    let fontImports = '';
    switch(mode) {
        case 'metal':
            fontImports = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Roboto+Condensed:wght@300;400;700&display=swap';
            break;
        case 'girly':
            fontImports = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Quicksand:wght@300;400;600&display=swap';
            break;
        case 'retro':
            fontImports = 'https://fonts.googleapis.com/css2?family=Righteous&family=Orbitron:wght@400;700;900&display=swap';
            break;
        case 'space':
            fontImports = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600&display=swap';
            break;
    }
    fontLink.href = fontImports;
    
    const styles = `
        body {
            background: ${modeConfig.background} !important;
            font-family: ${modeConfig.fonts.body} !important;
            color: ${modeConfig.colors.text} !important;
        }
        
        header h1 {
            font-family: ${modeConfig.fonts.heading} !important;
            color: ${modeConfig.colors.primary} !important;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3) !important;
        }
        
        .subtitle {
            color: ${modeConfig.colors.secondary} !important;
            font-family: ${modeConfig.fonts.body} !important;
        }
        
        main {
            background: rgba(255, 255, 255, ${mode === 'metal' ? '0.1' : '0.9'}) !important;
            border: 2px solid ${modeConfig.colors.accent} !important;
            ${mode === 'metal' ? 'box-shadow: 0 0 20px rgba(255, 0, 0, 0.3) !important;' : ''}
            ${mode === 'space' ? 'box-shadow: 0 0 30px rgba(83, 52, 131, 0.5) !important;' : ''}
        }
        
        .stanza {
            background: ${mode === 'metal' ? 'rgba(0, 0, 0, 0.8)' : 
                        mode === 'girly' ? 'rgba(255, 182, 193, 0.3)' :
                        mode === 'retro' ? 'rgba(255, 220, 0, 0.2)' :
                        'rgba(15, 52, 96, 0.2)'} !important;
            border-left: 4px solid ${modeConfig.colors.primary} !important;
            color: ${modeConfig.colors.text} !important;
        }
        
        .poem-image {
            ${mode === 'metal' ? 'filter: contrast(1.2) brightness(0.8) !important;' : ''}
            ${mode === 'girly' ? 'filter: saturate(1.3) brightness(1.1) !important;' : ''}
            ${mode === 'retro' ? 'filter: sepia(0.3) saturate(1.2) !important;' : ''}
            ${mode === 'space' ? 'filter: hue-rotate(240deg) contrast(1.1) !important;' : ''}
        }
        
        #regenerate-btn {
            background: linear-gradient(135deg, ${modeConfig.colors.primary}, ${modeConfig.colors.secondary}) !important;
            color: ${mode === 'metal' ? '#ffffff' : 
                   mode === 'girly' ? '#ffffff' :
                   mode === 'retro' ? '#000000' :
                   '#ffffff'} !important;
        }
        
        .mode-indicator {
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${modeConfig.colors.primary};
            color: ${mode === 'retro' ? '#000000' : '#ffffff'};
            padding: 10px 15px;
            border-radius: 20px;
            font-family: ${modeConfig.fonts.body};
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
    `;
    
    modeStyleSheet.textContent = styles;
}

// Function to create and play audio
function playModeMusic(mode) {
    // Remove existing audio
    const existingAudio = document.getElementById('mode-audio');
    if (existingAudio) {
        existingAudio.pause();
        existingAudio.remove();
    }
    
    // Create new audio element
    const audio = document.createElement('audio');
    audio.id = 'mode-audio';
    audio.loop = true;
    audio.volume = 0.3;
    
    // For demo purposes, we'll use a data URL for a silent audio file
    // In a real implementation, you'd use actual song URLs
    const silentAudio = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
    
    // Create source element
    const source = document.createElement('source');
    source.src = silentAudio; // Replace with actual song URLs
    source.type = 'audio/wav';
    
    audio.appendChild(source);
    document.body.appendChild(audio);
    
    // Attempt to play (browsers may block autoplay)
    audio.play().catch(e => {
        console.log('Autoplay blocked - user interaction required');
        // Add click handler to play music
        document.addEventListener('click', function playOnClick() {
            audio.play();
            document.removeEventListener('click', playOnClick);
        }, { once: true });
    });
}

// Function to add audio controls
function addAudioControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'audio-controls';
    
    const toggleButton = document.createElement('button');
    toggleButton.className = 'audio-toggle';
    toggleButton.innerHTML = '🔊';
    toggleButton.title = 'Toggle Music';
    
    let isPlaying = true;
    
    toggleButton.addEventListener('click', () => {
        const audio = document.getElementById('mode-audio');
        if (audio) {
            if (isPlaying) {
                audio.pause();
                toggleButton.innerHTML = '🔇';
                isPlaying = false;
            } else {
                audio.play();
                toggleButton.innerHTML = '🔊';
                isPlaying = true;
            }
        }
    });
    
    controlsContainer.appendChild(toggleButton);
    document.body.appendChild(controlsContainer);
}

// Function to add mode indicator
function addModeIndicator(mode) {
    // Remove existing indicator
    const existing = document.querySelector('.mode-indicator');
    if (existing) existing.remove();
    
    const indicator = document.createElement('div');
    indicator.className = 'mode-indicator';
    indicator.textContent = modes[mode].name;
    document.body.appendChild(indicator);
}

// Utility function to shuffle an array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to get a random image for a stanza
function getRandomImageForStanza(stanza, usedImages = []) {
    const poemData = getPoemData();
    
    // First try to find images that match the stanza's preferred types
    const preferredImages = imagePool.filter(img => 
        stanza.preferredImages.includes(img.type) && 
        !usedImages.includes(img.src)
    );
    
    if (preferredImages.length > 0) {
        return preferredImages[Math.floor(Math.random() * preferredImages.length)];
    }
    
    // If no preferred images available, use any unused image
    const availableImages = imagePool.filter(img => !usedImages.includes(img.src));
    if (availableImages.length > 0) {
        return availableImages[Math.floor(Math.random() * availableImages.length)];
    }
    
    // If all images are used, just pick any random image
    return imagePool[Math.floor(Math.random() * imagePool.length)];
}

// Function to create a stanza HTML element
function createStanzaElement(stanza, imageData, index) {
    const section = document.createElement('section');
    section.className = 'poem-section';
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    // Add act indicator if available
    if (stanza.act) {
        const actLabel = document.createElement('div');
        actLabel.className = 'act-label';
        actLabel.textContent = stanza.act;
        if (stanza.ending_type) {
            actLabel.textContent += ` (${stanza.ending_type} ending)`;
        }
        section.appendChild(actLabel);
    }
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    
    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.className = 'poem-image';
    img.loading = 'lazy';
    
    // Add error handling for local images
    img.onerror = function() {
        // If local image fails, try to find a backup online image
        const backupImages = imagePool.filter(backupImg => 
            backupImg.src.startsWith('https://') && 
            backupImg.type === imageData.type
        );
        if (backupImages.length > 0) {
            this.src = backupImages[0].src;
            this.alt = backupImages[0].alt;
        }
    };
    
    imageContainer.appendChild(img);
    
    const stanzaDiv = document.createElement('div');
    stanzaDiv.className = 'stanza';
    
    stanza.lines.forEach(line => {
        if (line.trim()) { // Only add non-empty lines
            const p = document.createElement('p');
            p.textContent = line;
            stanzaDiv.appendChild(p);
        }
    });
    
    section.appendChild(imageContainer);
    section.appendChild(stanzaDiv);
    
    // Add notes if available (hidden by default, can be shown on hover)
    if (stanza.notes) {
        const notesDiv = document.createElement('div');
        notesDiv.className = 'stanza-notes';
        notesDiv.textContent = stanza.notes;
        notesDiv.style.display = 'none';
        section.appendChild(notesDiv);
        
        // Show notes on section hover
        section.addEventListener('mouseenter', () => {
            notesDiv.style.display = 'block';
        });
        section.addEventListener('mouseleave', () => {
            notesDiv.style.display = 'none';
        });
    }
    
    return section;
}

// Function to animate elements into view
function animateElementIn(element, delay = 0) {
    setTimeout(() => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay);
}

// Function to generate and insert the poem
async function generatePoem() {
    const container = document.getElementById('poem-container');
    if (!container) return;
    
    // Get current poem data based on mode and JSON sampling
    const poemData = await getPoemData();
    
    // Clear existing content
    container.innerHTML = '';
    
    // Add loading indicator
    container.innerHTML = '<div class="loading">Loading poem...</div>';
    
    // Create main element
    const main = document.createElement('main');
    
    const usedImages = [];
    
    // Create stanzas with randomized images
    poemData.stanzas.forEach((stanza, index) => {
        const imageData = getRandomImageForStanza(stanza, usedImages);
        usedImages.push(imageData.src);
        
        const stanzaElement = createStanzaElement(stanza, imageData, index);
        main.appendChild(stanzaElement);
    });
    
    // Replace loading with actual content
    setTimeout(() => {
        container.innerHTML = '';
        container.appendChild(main);
        
        // Animate stanzas in sequence
        const stanzas = main.querySelectorAll('.poem-section');
        stanzas.forEach((stanza, index) => {
            animateElementIn(stanza, index * 200);
        });
    }, 500);
}

// Function to regenerate poem with new random images and/or mode
async function regeneratePoem() {
    const button = document.getElementById('regenerate-btn');
    if (button) {
        button.textContent = 'Regenerating...';
        button.disabled = true;
    }
    
    // Optionally change mode (30% chance)
    if (Math.random() < 0.3) {
        selectRandomMode();
        applyModeStyles(currentMode);
        addModeIndicator(currentMode);
        playModeMusic(currentMode);
        
        // Update title - will be updated by getPoemData()
    }
    
    setTimeout(async () => {
        await generatePoem();
        
        // Update title and subtitle after poem generation
        const poemData = await getPoemData();
        document.querySelector('header h1').textContent = poemData.title;
        document.querySelector('.subtitle').textContent = poemData.subtitle;
        
        if (button) {
            button.textContent = 'Randomize';
            button.disabled = false;
        }
    }, 300);
}

// Add regenerate button
function addRegenerateButton() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.textAlign = 'center';
    buttonContainer.style.marginTop = '20px';
    
    const button = document.createElement('button');
    button.id = 'regenerate-btn';
    button.textContent = 'Randomize';
    button.style.cssText = `
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    `;
    
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
    });
    
    button.addEventListener('click', regeneratePoem);
    
    buttonContainer.appendChild(button);
    
    // Insert before footer
    const footer = container.querySelector('footer');
    container.insertBefore(buttonContainer, footer);
}

// Initialize the poem when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    // Select random mode
    selectRandomMode();
    
    // Apply mode styles
    applyModeStyles(currentMode);
    
    // Add mode indicator
    addModeIndicator(currentMode);
    
    // Generate poem first to get the title/subtitle
    await generatePoem();
    
    // Update title and subtitle based on mode and sampled verses
    const poemData = await getPoemData();
    document.querySelector('header h1').textContent = poemData.title;
    document.querySelector('.subtitle').textContent = poemData.subtitle;
    
    // Add regenerate button
    addRegenerateButton();
    
    // Add audio controls
    addAudioControls();
    
    // Play mode music
    playModeMusic(currentMode);
});

// Add some CSS for the loading indicator
const style = document.createElement('style');
style.textContent = `
    .loading {
        text-align: center;
        padding: 50px;
        font-size: 1.2rem;
        color: #7f8c8d;
        font-style: italic;
    }
    
    .poem-section {
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);
