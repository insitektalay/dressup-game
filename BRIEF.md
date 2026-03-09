# 3D Social Dress-Up Game — Full Build Brief

## Vision
Build a **polished, modern 3D browser-based social dress-up game** using TypeScript, Next.js, React Three Fiber, and Three.js. Think of the aesthetic and social energy of Roblox fashion/dress-up games — players walking around a stylish 3D world, dressing up avatars, joining fashion rounds, and viewing each other — but with a completely original, toy-like visual style. No Roblox assets or branding.

This is a **ground-up rebuild**. The existing code is a single-file HTML page with 2D emoji sprites. Nothing is reusable architecturally.

## Target Audience
A 9-year-old girl who loves fashion, fairy tales, sparkle, and social games. The UI must be fun, colourful, intuitive, and very girly (pink/pastel/sparkle aesthetic). She plays on a phone/tablet primarily.

## Tech Stack
- **Next.js 14+** (App Router)
- **TypeScript** (strict)
- **React Three Fiber** + **@react-three/drei** for 3D rendering
- **Three.js** (underlying 3D engine)
- **Zustand** for state management
- **Tailwind CSS** for UI panels/overlays
- **GLTF/GLB models** for avatars and clothing (use procedural/primitive geometry as placeholders if no assets available)

## Architecture — Modular System

Create these clearly separated modules:

### 1. Avatar System (`src/modules/avatar/`)
- Humanoid avatar built from Three.js primitives (capsule body, sphere head, cylinder limbs) — stylised toy/chibi proportions
- Bone-based skeleton for animation readiness
- Skin colour picker (pastel palette)
- Face features: eyes (emoji-style or simple shapes), mouth, blush
- Avatar state interface: `AvatarState { skinColor, faceStyle, hair, top, bottom, shoes, accessory }`

### 2. Clothing System (`src/modules/clothing/`)
- Modular clothing items that attach to avatar body parts
- Categories: Hair, Tops, Bottoms, Shoes, Accessories
- Each item is a React Three Fiber component that renders geometry on the avatar
- Items defined in a data catalogue (`clothingCatalog.ts`) with: id, name, category, rarity, unlockCost, component
- Rarity system: Common, Rare, Legendary (visual glow/particle for legendary)
- Items snap to correct body position via predefined attachment points

### 3. Wardrobe / Inventory UI (`src/modules/wardrobe/`)
- Full-screen overlay wardrobe panel (React/Tailwind, not 3D)
- Category tabs (Hair, Tops, Bottoms, Shoes, Accessories)
- Grid of items with previews, rarity badges, lock icons for unpurchased
- "Try On" preview — updates avatar in real-time
- Coin balance display
- Purchase flow (coins earned from fashion rounds)

### 4. World System (`src/modules/world/`)
- 3D environment: a stylised "Fashion Plaza" — flat ground plane with pastel tile texture, decorative elements (fountains, benches, flower beds, a runway stage)
- Built from Three.js primitives and procedural geometry (boxes, cylinders, planes with materials)
- Skybox or gradient sky (pastel sunrise colours)
- Defined walkable area with invisible boundary colliders
- Key locations: Spawn point, Runway Stage, Wardrobe Station, Social Area

### 5. Movement System (`src/modules/movement/`)
- Third-person camera (orbiting behind avatar, slight offset above)
- Touch joystick for mobile (virtual joystick overlay in bottom-left)
- WASD/Arrow keys for desktop
- Smooth movement with acceleration/deceleration
- Avatar faces movement direction
- Simple idle/walk animation (bob + limb swing using procedural animation)
- Camera follows with smooth lerp, player can orbit with drag

### 6. Fashion Rounds (`src/modules/rounds/`)
- "Fashion Round" gameplay loop:
  1. Theme announced (e.g. "Princess Ball 👸", "Beach Day 🏖️", "Pop Star 🎤")
  2. 60-second dress-up timer
  3. Players walk the runway
  4. Voting/scoring (initially vs computer with semi-random scores, like existing game)
  5. Coins awarded based on score
- Round state machine: LOBBY → THEME_ANNOUNCE → DRESSING → RUNWAY → SCORING → RESULTS
- Theme list in data file

### 7. Multiplayer Presence (`src/modules/multiplayer/`)
- **Phase 1 (this build):** Simulated multiplayer — 3-5 NPC "players" walking around the world with random outfits, random movement paths, idle near landmarks
- NPCs have name labels floating above heads
- NPCs react to fashion rounds (dress up, walk runway)
- Architecture prepared for real multiplayer (state sync interface, player entity abstraction)
- **Phase 2 (future):** WebSocket/WebRTC real multiplayer

### 8. UI System (`src/modules/ui/`)
- HUD overlay: coin counter, round timer, mini-map (optional)
- Wardrobe button (opens wardrobe panel)
- Chat bubbles above NPCs (pre-scripted fun messages)
- Toast notifications ("🎉 You unlocked Fairy Wings!")
- All UI is React/Tailwind overlaid on the 3D canvas
- Mobile-first responsive design

### 9. Economy (`src/modules/economy/`)
- Coin system with Zustand store
- Earn coins: fashion rounds, floating collectible coins in world, daily bonus
- Spend coins: unlock clothing items
- Persist to localStorage
- Milestone unlocks (e.g. 1000 coins = VIP items)

## Visual Style Guide
- **Colour palette:** Pastel pinks, lavenders, mint greens, soft yellows, white, with hot pink/magenta accents
- **Materials:** Toon/cel-shaded look — use MeshToonMaterial or custom shaders. Soft shadows.
- **Lighting:** Warm ambient + soft directional (golden hour feel). Pink-tinted hemisphere light.
- **Text/UI:** Rounded fonts (like Quicksand), lots of emoji, sparkle effects
- **Particles:** Floating sparkle particles in the world, confetti on round wins

## File Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx            # Main game entry
│   └── globals.css
├── modules/
│   ├── avatar/
│   │   ├── Avatar.tsx      # Main avatar 3D component
│   │   ├── AvatarBuilder.tsx
│   │   ├── types.ts
│   │   └── parts/          # Individual body part components
│   ├── clothing/
│   │   ├── ClothingCatalog.ts
│   │   ├── ClothingItem.tsx
│   │   └── types.ts
│   ├── wardrobe/
│   │   ├── WardrobePanel.tsx
│   │   ├── ItemCard.tsx
│   │   └── CategoryTabs.tsx
│   ├── world/
│   │   ├── World.tsx
│   │   ├── FashionPlaza.tsx
│   │   ├── Runway.tsx
│   │   └── Decorations.tsx
│   ├── movement/
│   │   ├── PlayerController.tsx
│   │   ├── ThirdPersonCamera.tsx
│   │   ├── VirtualJoystick.tsx
│   │   └── useMovement.ts
│   ├── rounds/
│   │   ├── RoundManager.tsx
│   │   ├── ThemeAnnouncer.tsx
│   │   ├── RunwayWalk.tsx
│   │   ├── Scoring.tsx
│   │   └── themes.ts
│   ├── multiplayer/
│   │   ├── NPCManager.tsx
│   │   ├── NPCAvatar.tsx
│   │   ├── NameLabel.tsx
│   │   └── types.ts
│   ├── ui/
│   │   ├── HUD.tsx
│   │   ├── CoinCounter.tsx
│   │   ├── Toast.tsx
│   │   └── MobileControls.tsx
│   └── economy/
│       ├── useEconomy.ts
│       └── types.ts
├── stores/
│   ├── gameStore.ts        # Main game state
│   ├── avatarStore.ts      # Avatar customisation state
│   └── economyStore.ts     # Coins, inventory, unlocks
└── utils/
    ├── constants.ts
    └── helpers.ts
```

## Key Behaviours
1. On load → player avatar spawns at spawn point, NPCs are already roaming
2. Player can move freely with joystick/WASD
3. Walking near "Wardrobe Station" shows button to open wardrobe
4. Wardrobe lets you dress up (changes reflect immediately on 3D avatar)
5. Fashion rounds trigger periodically (or via "Start Round" button on Runway)
6. Round plays out: theme → dress → walk → score → coins
7. Coins persist across sessions via localStorage

## Performance Targets
- 60fps on mid-range phones
- Low poly everything (< 500 triangles per avatar)
- Instanced geometry where possible
- No external 3D model downloads needed — everything is procedural/primitive

## What to Build NOW (MVP)
1. ✅ Next.js project with TypeScript + Tailwind
2. ✅ 3D scene with React Three Fiber (sky, ground, basic plaza)
3. ✅ Procedural avatar (primitives) with clothing attachment points
4. ✅ Third-person movement (WASD + mobile joystick)
5. ✅ Wardrobe UI with clothing catalogue and real-time preview
6. ✅ Fashion round gameplay loop (vs computer)
7. ✅ Coin economy with localStorage persistence
8. ✅ 3-5 NPCs walking around
9. ✅ Sparkle particles and toon-shaded materials
10. ✅ Mobile-responsive

## DO NOT
- Do not copy any Roblox assets, logos, or branding
- Do not use external 3D model files (build everything from primitives)
- Do not add authentication or server-side multiplayer yet
- Do not over-engineer — ship a playable, fun MVP
