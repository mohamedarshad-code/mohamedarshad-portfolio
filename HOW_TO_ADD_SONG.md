# How to Add Kun Faya Kun Song

## Step 1: Download the Song
1. Download "Kun Faya Kun" as an MP3 file
2. Rename it to: `kun-faya-kun.mp3`

## Step 2: Store the Song
Put the MP3 file in the `public` folder:

```
c:\Users\amsir\Desktop\Portfolio\public\kun-faya-kun.mp3
```

**Important:** The file MUST be in the `public` folder, not in any subfolder.

## File Structure:
```
Portfolio/
├── public/
│   ├── kun-faya-kun.mp3  ← PUT YOUR SONG HERE
│   ├── spotify.png
│   ├── youtube.png
│   └── ... (other files)
├── components/
├── app/
└── ...
```

## Step 3: Restart Server
After adding the file:
```bash
# The server should auto-reload, but if not:
# Stop the server (Ctrl+C) and run:
npm run dev
```

## Step 4: Test
1. Open http://localhost:3000
2. Click Spotify app
3. Click play button
4. Song should play!

## Troubleshooting

**Song not playing?**
- Check file name is exactly: `kun-faya-kun.mp3`
- Check file is in `public` folder (not in a subfolder)
- Check file format is MP3
- Restart the dev server

**File path in code:**
The Spotify app will look for: `/kun-faya-kun.mp3`
This automatically points to `public/kun-faya-kun.mp3`
