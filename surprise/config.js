/* ============================================================
   EVERYTHING YOU'D WANT TO CHANGE LIVES IN THIS FILE.
   Nothing here touches layout or animation — just edit the
   text, numbers, and file paths below.
   ============================================================ */

const SURPRISE_CONFIG = {

  // 4-digit code she'll enter on the lock screen. Digits only.
  passcode: "2302",

  // Shown under the keypad on the lock screen.
  lockHint: "for your eyes only ♡",

  // Used in a couple of headings around the site (e.g. "everything I love about ___").
  toName: "you",

  // -------------------- NOTE SECTION --------------------
  note: {
    title: "a little note for you",
    text: "I might not be able to walk through your door today, but I'm sending this virtual bouquet to hold my place. I know I promised to make today special, and I'm keeping that promise close to my heart. I might not be there to see your face when you read this, but I'm sending all my love and warmth through these words. Can't wait to celebrate 'us' properly very soon."
  },

  // -------------------- SONG SECTION --------------------
  // Paste the YouTube video ID (the part after "v=" in the URL,
  // or the whole watch URL — both work). You can also point this
  // at a local video file sitting in this same folder, e.g.
  // "Tumi Aaashe Pashe Thakle.mp4" — it'll play with normal video
  // controls instead of embedding YouTube.
  song: {
    title: "Tumi Aaashe Pashe Thakle",
    youtubeId: "Tumi Aaashe Pashe Thakle.mp4",
    caption: "Tumi Aaashe Pashe Thakle <3"
  },

  // -------------------- JAR OF LOVE --------------------
  // Each heart in the jar. Short label on the heart, longer
  // message shown when it's tapped. Add or remove as many as you like.
  loveReasons: [
    { label: "your eyes", message: "The way they light up when you laugh at something dumb I said." },
    { label: "your smile", message: "It's honestly my favorite thing to be the reason for." },
    { label: "your gestures", message: "Every little thing you do without even thinking — I notice all of it." },
    { label: "how you care\nfor me", message: "You check on me in ways I don't even ask for. I see it, I love it." },
    { label: "how you\nlisten to me", message: "You actually listen. Not waiting for your turn to talk — really listening." },
    { label: "your hugs", message: "Your hugs fix more bad days than you know but they are still yet to come to me" }
  ],

  // -------------------- PHOTOS SECTION --------------------
  // Drop your own images into a "photos" folder next to this
  // file and point src at them, e.g. "photos/1.jpg".
  // Leave src empty ("") to show a placeholder frame instead.
  photos: [
    { src: "Screenshot 2025-07-02 003201.png", alt: "" },
    { src: "WhatsApp Image 2026-08-01 at 7.23.17 AM.jpeg", alt: "" },
    { src: "WhatsApp Image 2026-08-01 at 7.26.42 AM.jpeg", alt: "" },
    { src: "WhatsApp Image 2026-08-01 at 7.23.44 AM.jpeg", alt: "" }
  ],
  photoCaption: "here's how my queen looks <3",

  // -------------------- AWARD SECTION --------------------
  // "kind" fills in "Best ___ Award" — e.g. "Girlfriend", "Boyfriend", "Partner".
  // Add more objects to the entries array for a multi-page award carousel.
  award: {
    kind: "Girlfriend",
    entries: [
      {
        name: "",
        message: "You are the most precious person I have ever had. I just wanna say thank you for being in my life, listening to all my rants, and being there when I needed you the most."
      }
    ]
  },

  // -------------------- FINAL SURPRISE --------------------
  surprise: {
    finaleTitle: "I love you <3",
    finaleMessage: "That's everything for now — but there's always more where that came from. Thank you for being exactly who you are."
  }
};