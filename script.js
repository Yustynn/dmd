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
    },
    corpo: {
        name: "Corpo Mode",
        colors: {
            primary: "#f5f7fa",
            secondary: "#c3cfe2",
            accent: "#0070f3",
            text: "#333333"
        },
        fonts: {
            heading: "'Segoe UI', 'Arial', sans-serif",
            body: "'Roboto', 'Arial', sans-serif"
        },
        song: "https://www.soundjay.com/misc/sounds/corporate-music.mp3", // Placeholder - replace with actual corpo jingle
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
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
        title: "Hellhound Rising",
        subtitle: "Daddy taught me how to train the metal dog"
    },
    girly: {
        title: "Sparkles & Bows",
        subtitle: "Daddy gave me the cutest dog ever"
    },
    retro: {
        title: "8-Bit Companions",
        subtitle: "Daddy, me, and our pixelated dog adventures"
    },
    space: {
        title: "Dog+Me+Daddy",
        subtitle: "A marketing adventure against blurbo"
    },
    corpo: {
        title: "Optimal Pet Solutions",
        subtitle: "How daddy and me leveraged synergy with the dog"
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
    
    // Separate verses by act (fix act names to match JSON)
    const act1Verses = poemDatabase.filter(verse => verse.act === 'ACT_1');
    const act2Verses = poemDatabase.filter(verse => verse.act === 'ACT_2');
    const act3Verses = poemDatabase.filter(verse => verse.act === 'ACT_3');
    
    // Sample one verse from each act
    const selectedVerses = [];
    
    if (act1Verses.length > 0) {
        const randomAct1 = act1Verses[Math.floor(Math.random() * act1Verses.length)];
        selectedVerses.push({
            lines: randomAct1.text.split('\n'),
            act: 'ACT_1',
            notes: randomAct1.notes,
            img: randomAct1.img, // Use the specific image from JSON
            id: randomAct1.id,
            preferredImages: getImagesForAct('ACT_1')
        });
    }
    
    if (act2Verses.length > 0) {
        const randomAct2 = act2Verses[Math.floor(Math.random() * act2Verses.length)];
        selectedVerses.push({
            lines: randomAct2.text.split('\n'),
            act: 'ACT_2', 
            notes: randomAct2.notes,
            img: randomAct2.img, // Use the specific image from JSON
            id: randomAct2.id,
            preferredImages: getImagesForAct('ACT_2')
        });
    }
    
    if (act3Verses.length > 0) {
        const randomAct3 = act3Verses[Math.floor(Math.random() * act3Verses.length)];
        selectedVerses.push({
            lines: randomAct3.text.split('\n'),
            act: 'ACT_3',
            notes: randomAct3.notes,
            img: randomAct3.img, // Use the specific image from JSON
            id: randomAct3.id,
            ending_type: randomAct3.ending_type,
            preferredImages: getImagesForAct('ACT_3')
        });
    }
    
    return selectedVerses;
}

// Function to get appropriate images for each act
function getImagesForAct(act) {
    switch(act) {
        case 'ACT_1':
            return ['tech', 'digital', 'screens'];
        case 'ACT_2': 
            return ['battle', 'chaos', 'conflict'];
        case 'ACT_3':
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

// Function to apply mode styling - CORNY & ANIMATED WITH TILED BACKGROUNDS
function applyModeStyles(mode) {
    const modeConfig = modes[mode];
    if (!modeConfig) return;
    
    // Remove all mode classes
    document.body.className = '';
    document.body.classList.add(`${mode}-mode`, 'corny-theme');

    // Remove existing corny style if present
    const oldCorny = document.getElementById('corny-theme-style');
    if (oldCorny) oldCorny.remove();

    // Corny tiled SVG backgrounds for each mode (HTML entities, y=36 for vertical centering, and proper escaping)
    const cornyTiles = {
        metal: `url('data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="%231a1a1a"/><text x="24" y="36" font-size="32" text-anchor="middle" fill="%23ff0000" font-family="Arial">%E2%9A%A1</text></svg>')`, // lightning bolt
        girly: `url('data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="%23ffb6c1"/><text x="24" y="36" font-size="32" text-anchor="middle" fill="%23ff69b4" font-family="Arial">%E2%9D%A4</text></svg>')`, // heart
        retro: `url('data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="%23ffdc00"/><text x="24" y="36" font-size="32" text-anchor="middle" fill="%23ff6b35" font-family="Arial">%E2%98%85</text></svg>')`, // star
        space: `url('data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="%230f3460"/><circle cx="24" cy="24" r="10" fill="%23533483"/><text x="24" y="36" font-size="24" text-anchor="middle" fill="%23e94560" font-family="Arial">%E2%9C%AA</text></svg>')`, // sparkle/star
        corpo: `url('data:image/svg+xml;utf8,<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="%23f5f7fa"/><text x="24" y="36" font-size="18" text-anchor="middle" fill="%230070f3" font-family="Arial">%24</text><text x="24" y="20" font-size="18" text-anchor="middle" fill="%23333" font-family="Arial">%E2%9C%94</text></svg>')` // dollar sign and checkmark
    };

    // Corny CSS for each mode with tiled backgrounds (force background-size, background-repeat, and !important)
    const cornyCSS = {
        metal: `
            body.metal-mode.corny-theme {
                background-color: #1a1a1a !important;
                background-image: ${cornyTiles.metal} !important;
                background-size: 48px 48px !important;
                background-repeat: repeat !important;
                background-attachment: scroll !important;
                cursor: url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f525.png'), crosshair !important;
                animation: metal-bg-flash 2s infinite alternate;
            }
            @keyframes metal-bg-flash {
                0% { filter: brightness(1) contrast(1); }
                100% { filter: brightness(1.2) contrast(1.3) drop-shadow(0 0 30px #ff0000); }
            }
            .mode-indicator {
                background: repeating-linear-gradient(45deg, #ff0000, #ff0000 10px, #333 10px, #333 20px);
                color: #fff;
                font-family: 'Metal Mania', cursive, sans-serif;
                font-size: 2.2rem;
                letter-spacing: 2px;
                border: 4px solid #fff;
                border-radius: 12px;
                box-shadow: 0 0 30px #ff0000, 0 0 10px #fff inset;
                padding: 12px 32px;
                margin: 24px auto 12px auto;
                text-shadow: 0 0 8px #ff0000, 0 0 2px #fff;
                animation: corny-bounce 1.2s infinite alternate;
            }
        `,
        girly: `
            body.girly-mode.corny-theme {
                background-color: #ffb6c1 !important;
                background-image: ${cornyTiles.girly} !important;
                background-size: 48px 48px !important;
                background-repeat: repeat !important;
                background-attachment: scroll !important;
                cursor: url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f497.png'), pointer !important;
                animation: girly-bg-sparkle 3s linear infinite;
            }
            @keyframes girly-bg-sparkle {
                0% { background-position: 0 0; }
                100% { background-position: 100px 100px; }
            }
            .mode-indicator {
                background: repeating-linear-gradient(135deg, #ffb6c1, #ff69b4 20px, #fff 40px);
                color: #8b008b;
                font-family: 'Dancing Script', cursive, sans-serif;
                font-size: 2.2rem;
                border: 4px dashed #ff69b4;
                border-radius: 24px;
                box-shadow: 0 0 30px #ffb6c1, 0 0 10px #fff inset;
                padding: 12px 32px;
                margin: 24px auto 12px auto;
                text-shadow: 0 0 8px #ff69b4, 0 0 2px #fff;
                animation: corny-heartbeat 1.1s infinite;
            }
            @keyframes corny-heartbeat {
                0%, 100% { transform: scale(1); }
                20% { transform: scale(1.1); }
                40% { transform: scale(0.95); }
                60% { transform: scale(1.05); }
                80% { transform: scale(0.98); }
            }
        `,
        retro: `
            body.retro-mode.corny-theme {
                background-color: #ffdc00 !important;
                background-image: ${cornyTiles.retro} !important;
                background-size: 48px 48px !important;
                background-repeat: repeat !important;
                background-attachment: scroll !important;
                cursor: url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a8.png'), pointer !important;
                animation: retro-bg-move 4s linear infinite;
            }
            @keyframes retro-bg-move {
                0% { background-position: 0 0; }
                100% { background-position: 120px 0; }
            }
            .mode-indicator {
                background: repeating-linear-gradient(45deg, #ffdc00, #f7931e 10px, #ff6b35 20px);
                color: #2c1810;
                font-family: 'Righteous', cursive, sans-serif;
                font-size: 2.2rem;
                border: 4px double #ffdc00;
                border-radius: 16px;
                box-shadow: 0 0 30px #ffdc00, 0 0 10px #fff inset;
                padding: 12px 32px;
                margin: 24px auto 12px auto;
                text-shadow: 0 0 8px #ffdc00, 0 0 2px #fff;
                animation: corny-bounce 1.3s infinite alternate;
            }
        `,
        space: `
            body.space-mode.corny-theme {
                background-color: #0f3460 !important;
                background-image: ${cornyTiles.space} !important;
                background-size: 48px 48px !important;
                background-repeat: repeat !important;
                background-attachment: scroll !important;
                cursor: url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f52e.png'), pointer !important;
                animation: space-bg-stars 8s linear infinite;
            }
            @keyframes space-bg-stars {
                0% { background-position: 0 0; }
                100% { background-position: 0 200px; }
            }
            .mode-indicator {
                background: linear-gradient(90deg, #0f3460 0%, #533483 100%);
                color: #e94560;
                font-family: 'Orbitron', monospace, sans-serif;
                font-size: 2.2rem;
                border: 4px solid #e94560;
                border-radius: 50px;
                box-shadow: 0 0 30px #533483, 0 0 10px #fff inset;
                padding: 12px 32px;
                margin: 24px auto 12px auto;
                text-shadow: 0 0 8px #e94560, 0 0 2px #fff;
                animation: corny-glow 2s infinite alternate;
            }
            @keyframes corny-glow {
                0% { filter: drop-shadow(0 0 10px #e94560); }
                100% { filter: drop-shadow(0 0 30px #fff); }
            }
        `,
        corpo: `
            body.corpo-mode.corny-theme {
                background-color: #f5f7fa !important;
                background-image: ${cornyTiles.corpo} !important;
                background-size: 48px 48px !important;
                background-repeat: repeat !important;
                background-attachment: scroll !important;
                cursor: url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4b0.png'), pointer !important;
                animation: corpo-bg-slide 6s linear infinite;
            }
            @keyframes corpo-bg-slide {
                0% { background-position: 0 0; }
                100% { background-position: 200px 200px; }
            }
            .mode-indicator {
                background: repeating-linear-gradient(135deg, #c3cfe2, #0070f3 20px, #fff 40px);
                color: #0070f3;
                font-family: 'Segoe UI', Arial, sans-serif;
                font-size: 2.2rem;
                border: 4px solid #0070f3;
                border-radius: 16px;
                box-shadow: 0 0 30px #c3cfe2, 0 0 10px #fff inset;
                padding: 12px 32px;
                margin: 24px auto 12px auto;
                text-shadow: 0 0 8px #0070f3, 0 0 2px #fff;
                animation: corny-bounce 1.2s infinite alternate;
            }
        `
    };

    // General corny theme CSS
    const generalCorny = `
        .corny-theme main {
            border: 8px ridge gold;
            border-radius: 32px;
            box-shadow: 0 0 40px 10px #fff8, 0 0 0 8px #ff0a, 0 0 0 16px #f0f8ff44;
            margin: 32px auto;
            padding: 32px 16px 16px 16px;
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(2px);
            animation: corny-main-pop 1.2s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .header-glass {
            background: rgba(255,255,255,0.35);
            border-radius: 24px;
            box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
            backdrop-filter: blur(8px) saturate(1.5);
            -webkit-backdrop-filter: blur(8px) saturate(1.5);
            border: 1.5px solid rgba(255,255,255,0.25);
            padding: 24px 32px 18px 32px;
            margin: 32px auto 24px auto;
            display: inline-block;
            max-width: 90vw;
        }
        @keyframes corny-main-pop {
            0% { transform: scale(0.7) rotate(-8deg); opacity: 0; }
            80% { transform: scale(1.05) rotate(2deg); opacity: 1; }
            100% { transform: scale(1) rotate(0); }
        }
        .corny-theme .poem-section {
            border: 4px dashed #fff;
            border-radius: 18px;
            margin: 32px 0;
            box-shadow: 0 0 24px 4px #fffa, 0 0 0 4px #ff0a;
            background: rgba(255,255,255,0.18);
            transition: box-shadow 0.3s, transform 0.3s;
            animation: corny-bounce 1.2s infinite alternate;
        }
        @keyframes corny-bounce {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px) scale(1.03); }
        }
        .corny-theme .poem-section:hover {
            box-shadow: 0 0 40px 10px #ff0a, 0 0 0 8px #fff8;
            transform: scale(1.04) rotate(-2deg);
        }
        .corny-theme .poem-image {
            border: 4px solid #fff;
            border-radius: 16px;
            box-shadow: 0 0 20px 4px #fff8, 0 0 0 4px #ff0a;
            margin-bottom: 12px;
            animation: corny-img-pop 0.8s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes corny-img-pop {
            0% { transform: scale(0.7) rotate(-8deg); opacity: 0; }
            80% { transform: scale(1.05) rotate(2deg); opacity: 1; }
            100% { transform: scale(1) rotate(0); }
        }
        .corny-theme .act-label {
            font-size: 1.2rem;
            font-weight: bold;
            color: #fff;
            background: #000a;
            border-radius: 8px;
            padding: 4px 16px;
            margin-bottom: 8px;
            letter-spacing: 2px;
            box-shadow: 0 0 8px #fff8;
            animation: corny-bounce 1.2s infinite alternate;
        }
        .corny-theme .stanza-notes {
            font-size: 1rem;
            color: #fff;
            background: #ff0a;
            border-radius: 8px;
            padding: 6px 12px;
            margin-top: 8px;
            box-shadow: 0 0 8px #ff0a;
            animation: corny-bounce 1.2s infinite alternate;
        }
        .corny-theme #regenerate-btn {
            border: 4px solid #fff;
            border-radius: 32px;
            background: linear-gradient(90deg, #ff0, #f0f, #0ff, #ff0);
            background-size: 400% 400%;
            color: #000;
            font-weight: bold;
            font-size: 1.2rem;
            box-shadow: 0 0 24px 8px #fff8, 0 0 0 8px #ff0a;
            animation: corny-btn-glow 2s linear infinite, corny-btn-bgmove 6s linear infinite;
        }
        @keyframes corny-btn-glow {
            0% { box-shadow: 0 0 24px 8px #fff8, 0 0 0 8px #ff0a; }
            50% { box-shadow: 0 0 40px 16px #ff0a, 0 0 0 16px #fff8; }
            100% { box-shadow: 0 0 24px 8px #fff8, 0 0 0 8px #ff0a; }
        }
        @keyframes corny-btn-bgmove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
    `;

    // Compose style
    const style = document.createElement('style');
    style.id = 'corny-theme-style';
    style.textContent = (cornyCSS[mode] || '') + generalCorny;
    document.head.appendChild(style);

    // Remove existing mode indicator
    const existing = document.querySelector('.mode-indicator');
    if (existing) existing.remove();

    // Add animated mode indicator
    const indicator = document.createElement('div');
    indicator.className = 'mode-indicator';
    indicator.textContent = modes[mode].name + '!!!';
    document.body.appendChild(indicator);
}

// Function to create and play audio - SIMPLIFIED
function playModeMusic(mode) {
    // Audio disabled for performance - users can enable if desired
    return;
}

// Function to add audio controls - SIMPLIFIED
function addAudioControls() {
    // Audio controls disabled for performance
    return;
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
    // If the stanza has a specific image from the JSON, use it first
    if (stanza.img) {
        return {
            src: stanza.img,
            alt: `Image for ${stanza.act} - ${stanza.notes || 'stanza'}`,
            type: 'story-specific'
        };
    }
    
    // Fallback to the original logic for older stanzas without specific images
    // First try to find images that match the stanza's preferred types
    const preferredImages = imagePool.filter(img => 
        stanza.preferredImages && stanza.preferredImages.includes(img.type) && 
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

// Function to animate elements into view - OPTIMIZED
function animateElementIn(element, delay = 0) {
    // Use CSS transitions instead of timeout for better performance
    element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    
    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    });
}

// Function to generate and insert the poem - OPTIMIZED
async function generatePoem() {
    const container = document.getElementById('poem-container');
    if (!container) return;
    
    try {
        // Get current poem data based on mode and JSON sampling
        const poemData = await getPoemData();
        
        // Clear existing content efficiently
        container.innerHTML = '';
        
        // Create main element with document fragment for better performance
        const fragment = document.createDocumentFragment();
        const main = document.createElement('main');
        
        const usedImages = [];
        
        // Create stanzas with optimized image selection
        poemData.stanzas.forEach((stanza, index) => {
            const imageData = getRandomImageForStanza(stanza, usedImages);
            usedImages.push(imageData.src);
            
            const stanzaElement = createStanzaElement(stanza, imageData, index);
            main.appendChild(stanzaElement);
        });
        
        fragment.appendChild(main);
        container.appendChild(fragment);
        
        // Animate stanzas efficiently
        const stanzas = main.querySelectorAll('.poem-section');
        stanzas.forEach((stanza, index) => {
            // Stagger animation with requestAnimationFrame
            setTimeout(() => animateElementIn(stanza), index * 100);
        });
        
    } catch (error) {
        console.error('Error generating poem:', error);
        container.innerHTML = '<div class="error">Failed to load poem. Please refresh.</div>';
    }
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

// OPTIMIZED Initialize the poem when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Add frosted glass effect to header title, subtitle, and slogan
        let headerEl = document.querySelector('header');
        if (headerEl) {
            const h1 = headerEl.querySelector('h1');
            const subtitle = headerEl.querySelector('.subtitle');
            const slogan = document.getElementById('aussie-slogan');
            if (h1 && subtitle && slogan) {
                // Create wrapper
                const glassDiv = document.createElement('div');
                glassDiv.className = 'header-glass';
                // Move elements into wrapper
                glassDiv.appendChild(h1);
                glassDiv.appendChild(subtitle);
                glassDiv.appendChild(slogan);
                // Insert wrapper at top of header
                headerEl.insertBefore(glassDiv, headerEl.firstChild);
            }
        }
        
        // Load Australian slogan first
        await loadAussieSlogan();
        
        // Setup slogan click handler
        setupSloganClickHandler();
        
        // Select random mode
        selectRandomMode();
        
        // Apply mode styles (simplified)
        applyModeStyles(currentMode);
        
        // Wrap header content in a translucent glass div
        const header = document.querySelector('header');
        if (header && !header.querySelector('.header-glass')) {
            const h1 = header.querySelector('h1');
            const subtitle = header.querySelector('.subtitle');
            const slogan = document.getElementById('aussie-slogan');
            if (h1 && subtitle && slogan) {
                const glass = document.createElement('div');
                glass.className = 'header-glass';
                glass.appendChild(h1);
                glass.appendChild(subtitle);
                glass.appendChild(slogan);
                header.appendChild(glass);
            }
        }
        
        // Generate poem and get data
        await generatePoem();
        const poemData = await getPoemData();
        updateExtremeHeader(currentMode, poemData);
        
        // Add regenerate button functionality
        setupRegenerateButton();
        
    } catch (error) {
        console.error('Error initializing application:', error);
        // Fallback: still try to load basic poem
        await generatePoem();
    }
});

// Function to update extreme header based on mode - SIMPLIFIED
function updateExtremeHeader(mode, poemData) {
    const h1 = document.querySelector('header h1');
    const subtitle = document.querySelector('.subtitle');
    
    if (h1) h1.textContent = poemData.title;
    if (subtitle) subtitle.textContent = poemData.subtitle;
}

// Function to setup regenerate button - OPTIMIZED
function setupRegenerateButton() {
    const regenerateBtn = document.getElementById('regenerate-btn');
    if (regenerateBtn) {
        // Remove existing event listeners to prevent memory leaks
        regenerateBtn.replaceWith(regenerateBtn.cloneNode(true));
        const newBtn = document.getElementById('regenerate-btn');
        
        // Create optimized event handler
        const clickHandler = async () => {
            // Prevent multiple clicks
            if (newBtn.disabled) return;
            newBtn.disabled = true;
            newBtn.textContent = 'Regenerating...';
            
            try {
                // Load new Australian slogan
                await updateAussieSlogan();
                
                // Regenerate with new mode  
                selectRandomMode();
                applyModeStyles(currentMode);
                
                await generatePoem();
                const poemData = await getPoemData();
                updateExtremeHeader(currentMode, poemData);
                
            } catch (error) {
                console.error('Error regenerating poem:', error);
            } finally {
                newBtn.disabled = false;
                newBtn.textContent = 'Randomize';
            }
        };
        
        newBtn.addEventListener('click', clickHandler);
    }
}

// Function to initialize particle system - DISABLED FOR PERFORMANCE
function initializeParticleSystem(mode) {
    // Particle system completely disabled for better performance
    return;
}

// Function to cleanup particle system
function cleanupParticleSystem() {
    const particleSystem = document.getElementById('particle-system');
    if (particleSystem && particleSystem._animationId) {
        cancelAnimationFrame(particleSystem._animationId);
        particleSystem._animationId = null;
    }
}

// SIMPLIFIED cleanup function
function cleanup() {
    // Simplified cleanup - most systems are now disabled
    const regenerateBtn = document.getElementById('regenerate-btn');
    if (regenerateBtn) {
        regenerateBtn.replaceWith(regenerateBtn.cloneNode(true));
    }
}

// Simplified cleanup on page unload
window.addEventListener('beforeunload', cleanup);

// Function to load and display a random Australian slogan
async function loadAussieSlogan() {
    try {
        const response = await fetch('aussie-slogans.json');
        const slogans = await response.json();
        // Get all items and their slogans
        const items = Object.keys(slogans);
        const randomItem = items[Math.floor(Math.random() * items.length)];
        const itemSlogans = slogans[randomItem];
        const randomSlogan = itemSlogans[Math.floor(Math.random() * itemSlogans.length)];
        // Update the slogan display
        const sloganElement = document.querySelector('.slogan-text');
        if (sloganElement) {
            sloganElement.innerHTML = '<b>REDEFY REBRAND:</b> ' + randomSlogan;
        }
        return { item: randomItem, slogan: randomSlogan };
    } catch (error) {
        console.error('Failed to load Australian slogan:', error);
        // Fallback slogan
        const sloganElement = document.querySelector('.slogan-text');
        if (sloganElement) {
            sloganElement.innerHTML = '<b>REDEFY REBRAND:</b> It\'s not a website, it\'s digital poetry with extreme Australian energy.';
        }
        return null;
    }
}

// Function to update the Australian slogan (called when regenerating)
async function updateAussieSlogan() {
    const sloganData = await loadAussieSlogan();
    if (sloganData) {
        console.log(`Loaded slogan for ${sloganData.item}: ${sloganData.slogan}`);
    }
}

// Add click handler to the slogan for regeneration - OPTIMIZED
function setupSloganClickHandler() {
    const sloganElement = document.getElementById('aussie-slogan');
    if (sloganElement) {
        sloganElement.style.cursor = 'pointer';
        sloganElement.title = 'Click for a new Aussie slogan!';
        const clickHandler = async () => {
            const sloganText = sloganElement.querySelector('.slogan-text');
            if (sloganText) {
                sloganText.innerHTML = '<b>REDEFY REBRAND:</b> Getting new wisdom...';
                await updateAussieSlogan();
            }
        };
        sloganElement.addEventListener('click', clickHandler);
    }
}

