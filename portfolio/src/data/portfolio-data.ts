import { Project, StackGroup } from "@/types";

export const SITE_URL = "https://vikrant.sbs";

export const PERSONAL_INFO = {
  name: "Vikrant Kumar",
  // Also known by this name on GitHub and older profiles.
  alternateName: "Vikrant Choudhary",
  role: "Full-stack developer",
  location: "Mathura, India",
  education: "BCA, Manipal University Jaipur",
  email: "vikrantchoudhary1203@gmail.com",
  github: "https://github.com/vikrant-choudhary06",
  linkedin: "https://www.linkedin.com/in/vikrant-kumar-268631395/",
  instagram: "https://www.instagram.com/vikrant.thakurela/",
  status: "Open to internships and freelance work",
  about: [
    "Hi, I'm Vikrant. I'm studying BCA at Manipal University Jaipur and I've been building software since 12th grade.",
    "Right now most of my time goes into Rizzoto, a restaurant POS that keeps billing and the kitchen running even when the internet drops.",
  ],
};

export const PROJECTS: Project[] = [
  {
    slug: "rizzoto",
    name: "Rizzoto",
    kind: "Offline-first restaurant POS",
    summary:
      "A restaurant POS that keeps billing, KOTs and the kitchen screen running even when the internet goes down.",
    year: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Electron",
      "Tailwind CSS",
    ],
    source: "private",
    color: "#9B4DCA",
    links: {
      live: "https://rizzoto.vikrant.sbs",
    },
    problem:
      "Small restaurants and cafes in India bill on cloud POS systems that stop the moment the Wi-Fi drops, right in the middle of a rush. I wanted one system an owner can sign up for in minutes and run the whole outlet from: GST billing, KOTs to the kitchen, menu, tables, stock, staff logins and reports. And it had to keep working when the internet doesn't.",
    decisions: [
      {
        title: "One bill calculator shared by server and client",
        why: "GST splits, discounts, service charge and round-off live in a shared TypeScript package used by the API, the POS preview and the offline engine. The total a customer sees offline is exactly what the server records later. Amounts are worked out in paise, so floating point never puts a bill off by a rupee.",
      },
      {
        title: "Device-numbered bills for offline work",
        why: "Invoice numbers have to be gap-free per outlet and financial year. A till without internet can't ask the server for the next number, so offline bills carry the till's code (IND01/26-27/D1-00004). They can never clash with server numbers, and the sequence stays legal once it syncs.",
      },
      {
        title: "A local hub on the counter PC instead of offline mode in every tablet",
        why: "Browser-only offline works for one till, but waiters' tablets and the kitchen screen still need to see each other's orders. The Windows app runs a small hub on the shop's Wi-Fi. Online it just proxies to the cloud; offline it serves orders, KOTs, bills and the kitchen screen itself, then replays everything to the cloud in order.",
      },
      {
        title: "Server-sent events for live screens",
        why: "Tills and the kitchen only need to hear 'something changed, refetch'. SSE gave live updates over plain HTTP with no extra infrastructure, and the hub can fake the same stream locally when offline.",
      },
      {
        title: "Auto-updates from GitHub Releases",
        why: "Asking a cafe owner to reinstall an .exe for every fix doesn't work. The desktop app downloads updates in the background (usually under 1 MB thanks to differential downloads) and installs on the next start, so it never restarts mid-service.",
      },
    ],
    challenge:
      "Keeping data correct across an outage. While offline, the hub numbers orders and KOTs itself and queues every change with the session of the person who made it. When the internet returns, it replays the queue in order through the normal API. Server-assigned KOT ids are mapped back onto the local ones, and anything the server rejects is parked as 'not synced' instead of blocking every other order. I tested it end to end with Playwright: cut the connection, have a waiter's tablet send a KOT, see it on the kitchen screen, settle the bill at the counter, reconnect, and check that the cloud has the exact paid order and invoice.",
    images: [
      {
        src: "/projects/rizzoto/tables.png",
        alt: "Rizzoto tables screen showing six tables on the ground floor",
        caption: "Tables, grouped by area",
      },
    ],
  },
  {
    slug: "opensourcehub",
    name: "OpenSourceHub",
    kind: "Open-source issues and code battles platform",
    summary:
      "A developer community for discovering open-source issues, chatting with contributors, and competing in fairly judged code battles.",
    year: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "Fastify",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Monaco Editor",
      "Cloudflare Workers",
      "Tailwind CSS",
      "Judge0",
    ],
    source: "private",
    color: "#FACC15",
    links: {
      live: "https://opensourcehub.vikrantcode08.workers.dev",
    },
    problem:
      "Getting into open source is hard when you don't know where to start, and a GitHub profile shows almost nothing about how well someone actually codes. I wanted one place where a developer can find beginner-friendly issues on real repositories, follow and chat with other contributors, and prove their skills in head-to-head code battles. The battles had to be judged fairly enough that a win actually means something.",
    decisions: [
      {
        title: "No model decides who won",
        why: "Every submission runs in a sandbox against hidden tests. Passing all of them is a gate, not a score. After that, players are ranked by runtime, then memory, then who finished first. The problem is only picked when the battle starts, so nobody, not even the person who created it, can prepare in advance.",
      },
      {
        title: "A copy-detection threshold that was measured, not guessed",
        why: "I ran the similarity check over a problem bank where every problem has two independently written solutions. The closest honest pair scored 89%. Every lazy copy (a paste, a reformat, added comments, a variable renamed everywhere) scored 100%. The line sits at 95%, with zero false positives across 94 pairs. A flag goes to a human reviewer instead of banning anyone automatically.",
      },
      {
        title: "Ghost mode so there is always someone to play",
        why: "A small community often has nobody online. Every judged submission becomes a permanent opponent: its code is copied into a new battle and judged again next to yours, in the same sandbox at the same time. Clicking 'Find a battle' first waits ten seconds for a live opponent. Only if nobody comes does it fall back to a ghost picked close to your own usual pace.",
      },
      {
        title: "Test answers computed from two solutions, not written by hand",
        why: "Every problem ships with two independent solutions and no expected outputs. Both solutions run over every input, and they have to agree. Whatever they print becomes the answer. If they disagree, the problem is thrown out, so a player with correct code never loses to a wrong answer key.",
      },
      {
        title: "Editor telemetry as a signal, never a verdict",
        why: "The editor records how code arrived: paste counts and sizes, typed characters, and how often the player switched tabs. It never records the content itself. These numbers are shown next to the result for a person to look at, not used to block anyone, because switching tabs to read the docs is allowed.",
      },
    ],
    challenge:
      "Making the app fast without guessing where the time went. Simple requests were taking over a second, but EXPLAIN ANALYZE showed the query itself running in 0.055 ms, so the database wasn't the problem. Logging every SQL statement showed the real cause: on Supabase's transaction pooler, Prisma wrapped each query in BEGIN, DEALLOCATE ALL, the query and COMMIT, which meant four network round trips for a single SELECT 1. Switching the long-running server to the session pooler made that query take 164 ms instead of 815 ms. Turning on join-based relation loading made the battle screen's main query a single SQL statement instead of three, bringing it from 1790 ms down to 185 ms against the production database. I also merged the rate limiter's two Redis commands into one round trip, which fixed a leak that left keys in Redis with no expiry.",
    images: [],
  },
  {
    slug: "novacdb",
    name: "NoVacDB",
    kind: "PostgreSQL-compatible database in Go",
    summary:
      "A PostgreSQL-compatible database built from scratch in Go that updates rows in place and keeps old versions in an undo log, so tables don't bloat and never need VACUUM.",
    year: "2026",
    stack: ["Go", "PostgreSQL wire protocol", "B+Trees", "Write-ahead log", "MVCC", "Linux"],
    source: "public",
    color: "#FEF3C7",
    labels: ["Under development"],
    links: {
      github: "https://github.com/NoVacDB/NoVacDB",
    },
    problem:
      "PostgreSQL never changes a row in place: every UPDATE writes a new copy and leaves the old one behind. Tables and indexes bloat until VACUUM cleans them up, and on busy tables VACUUM itself becomes the problem. I wanted a database that speaks PostgreSQL's protocol, so psql, pgAdmin and existing drivers connect unchanged, but stores data the way InnoDB does: rows updated in place, old versions kept in an undo log only as long as a reader needs them. And it had to be written from first principles, with no third-party libraries.",
    decisions: [
      {
        title: "In-place updates with an undo log instead of PostgreSQL's append-only rows",
        why: "Every row carries an 18-byte header: the transaction that last wrote it and a pointer to its previous version in the undo log. An UPDATE saves the old version first, then changes the row where it is, so a table that is updated a million times stays the same size. Readers that need an older version walk the undo chain instead of the table holding every copy.",
      },
      {
        title: "Speak the PostgreSQL wire protocol, not a new one",
        why: "Writing my own protocol would have meant writing my own clients too. Implementing PostgreSQL's protocol 3.0 (startup, simple and extended queries, cancel requests) means psql, pgAdmin and every PostgreSQL driver work on day one, and NoVacDB can be compared with PostgreSQL using the same tools.",
      },
      {
        title: "Write-ahead log with checkpoints and full page images",
        why: "A commit returns only after its log records are fsynced; data pages are written later by checkpoints. Recovery replays the log from the last checkpoint, and a full image of each page after a checkpoint protects against half-written pages. The log replays rolled-back transactions too, because later records can depend on their page layout.",
      },
      {
        title: "Stable row IDs with forwarding stubs",
        why: "When an update makes a row too big for its page, it moves and leaves an 18-byte stub at home. Indexes, undo records and future row locks keep pointing at one ID for the row's whole life, so moving a row never rewrites an index.",
      },
      {
        title: "Readers never wait for writers",
        why: "Each statement reads through a snapshot of committed transactions, with READ COMMITTED and REPEATABLE READ like PostgreSQL. A writer holds a writer slot, not the read lock, so queries keep running while a transaction writes, and rollback undoes changes in place instead of blocking everyone.",
      },
    ],
    challenge:
      "Proving that concurrency and crash recovery are actually correct. I built a model checker that runs one writer committing and rolling back random transactions while REPEATABLE READ readers compare every read, by table scan and by index, against the exact state their snapshot should see, under Go's race detector. It found two real bugs that ordinary tests had missed: a transaction ID that was briefly invisible as 'active' between being allocated and logged, so a snapshot could see uncommitted rows; and a commit that freed its own undo a moment before snapshots stopped needing it. Crash tests cut power at random points with torn writes and check that every committed transaction survives and nothing else does. Every step is also checked by planting 25-40 deliberate bugs and confirming the tests catch them.",
    images: [],
  },
  {
    slug: "novacdb-studio",
    name: "NoVacDB Studio",
    kind: "Desktop SQL client for NoVacDB and PostgreSQL",
    summary: "A lightweight Windows desktop SQL client for NoVacDB that also works with any PostgreSQL server.",
    year: "2026",
    stack: ["Go", "Wails", "TypeScript", "CodeMirror", "PostgreSQL wire protocol", "Windows"],
    source: "public",
    color: "#CCFBF1",
    labels: ["Under development"],
    links: {
      github: "https://github.com/NoVacDB/NoVacDB-Studio",
    },
    problem:
      "NoVacDB speaks the PostgreSQL protocol, so psql and pgAdmin already connect to it. But psql is a terminal tool, and pgAdmin is a heavy web app built around PostgreSQL's own catalogs, which NoVacDB doesn't have yet. I wanted a small native app a Windows user can download and open in seconds: connect, write SQL, see results and errors clearly, and nothing that pretends the server can do more than it can.",
    decisions: [
      {
        title: "Wails instead of Electron",
        why: "Wails uses the WebView2 runtime already on Windows instead of shipping a whole Chromium, so the app is a fraction of Electron's size and memory. The backend is Go, the same language as NoVacDB, so the protocol code and the database code read the same way.",
      },
      {
        title: "Speak the PostgreSQL protocol, nothing custom",
        why: "Studio talks to the server exactly like psql does. That means it works with real PostgreSQL too, and every bug it finds in NoVacDB is a real protocol bug, not something a private API is hiding.",
      },
      {
        title: "Cancel that actually stops the query",
        why: "A Cancel button that only stops waiting leaves the server busy. Studio sends a PostgreSQL CancelRequest on a separate connection with the session's secret key, so the server stops the statement and the UI never freezes while a query runs.",
      },
      {
        title: "Passwords in Windows Credential Manager, never in a file",
        why: "Saved connections keep host, port, user and database in settings, but the password goes to the operating system's credential store. Untick 'Remember password' and Studio asks every time.",
      },
      {
        title: "Features follow the server",
        why: "No schema browser, transaction buttons or query-plan viewer until NoVacDB supports catalog queries, BEGIN/COMMIT over the wire and EXPLAIN. The UI shows what really works, and each feature lands when the database step behind it does.",
      },
    ],
    challenge:
      "Making large results and errors feel instant without lying about them. The results grid is virtualised, so 100,000 rows scroll smoothly, and copying cells pastes straight into Excel. Errors show every field the server sends (severity, SQLSTATE code, DETAIL and HINT) and highlight the position in the editor, because NoVacDB's errors are written to be useful and hiding half of them wastes that. I tested it against a real NoVacDB server running in WSL: inserting 100,000 rows in batches, selecting them all, cancelling a long query, killing the server mid-query and reconnecting, and checking every error field on a duplicate-key violation.",
    images: [],
  },
  {
    slug: "lyven",
    name: "Lyven",
    kind: "Live classroom platform for teachers",
    summary:
      "A live classroom platform where a teacher runs a shared whiteboard, polls and lecture slides for the whole class from one dashboard, and AI grades handwritten homework in the background.",
    year: "2026",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Socket.io",
      "Redis",
      "BullMQ",
      "Gemini API",
      "Docker",
      "Kubernetes",
    ],
    source: "private",
    color: "#D1FAE5",
    labels: ["Under development"],
    note: "Still being built, so some features may be unfinished.",
    links: {
      live: "https://teach-us.vercel.app",
    },
    problem:
      "Teachers juggle a projector, a paper register, a pile of homework to mark and a separate app for every quiz. Students on their own devices see none of what is on the board. I wanted one place where a teacher starts a session, students join with a PIN and see the board, slides and polls live, and the slow work (marking handwritten homework, planning lessons, emailing parents) happens automatically.",
    decisions: [
      {
        title: "Live session state in Redis, not in server memory",
        why: "A live 'flight deck' (whiteboard history, chat, doubts, joined students, the open poll, zoom and pan) is stored in Redis under its PIN, and Socket.io uses the Redis adapter. Any server instance can serve any student, and a student who joins late gets the full board state in one sync event instead of a blank canvas.",
      },
      {
        title: "Same code with or without Redis",
        why: "Every Redis call goes through one service class that falls back to an in-memory store when no REDIS_URL is set. Locally the app runs with just MongoDB; in production the same code gets shared state, caching and the job queue without any changes.",
      },
      {
        title: "AI grading as a background job",
        why: "Reading a handwritten page with Gemini takes several seconds, too long to hold an HTTP request open. The upload is put on a BullMQ queue, a worker grades it against the teacher's rubric, writes the score to the gradebook, deletes the temp file and pushes the result to the teacher over the socket. Without Redis it falls back to grading in the request.",
      },
      {
        title: "Caching AI answers by their input",
        why: "Lesson plans, maths solutions and visual aids are cached in Redis using a key built from the prompt inputs, kept for a day, a week or a month depending on how often the result changes. The same request from another teacher costs nothing and returns instantly.",
      },
      {
        title: "Organised by feature, ready to scale",
        why: "The backend is split into feature folders (auth, classroom, course, student, AI) with Zod request validation, role checks on every route, Helmet, rate limiting and Mongo sanitising. It ships as Docker images with Kubernetes manifests for the API, frontend, MongoDB, Redis and the ingress.",
      },
    ],
    challenge:
      "Keeping a live whiteboard in sync for everyone in the room. Drawing sends a lot of events, so stroke start and move events go straight to the room, and only the finished stroke is written into the saved board history. That keeps drawing smooth while still letting a late joiner rebuild the board. Disconnects were the other tricky part: if the teacher drops, the session closes for every student and is removed from Redis; if a student drops, they are taken off the teacher's list, the raised-hand queue and any co-op room, so the teacher's dashboard always shows who is really there.",
    images: [],
  },
  {
    slug: "miidayshop",
    name: "MiidayShop",
    kind: "Custom ecommerce store with Razorpay",
    summary:
      "A custom ecommerce platform for one brand, with its own storefront, admin panel and payments, so it doesn't have to rent a store from Shopify.",
    year: "2026",
    stack: ["Next.js", "React", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Razorpay", "Tailwind CSS"],
    source: "public",
    color: "#E0E7FF",
    links: {
      github: "https://github.com/vikrant-choudhary06/miiday-shop",
    },
    problem:
      "Small D2C brands in India usually sell on hosted platforms that take a monthly fee and a cut of every sale, and they don't fully own their store's data or checkout. I wanted miiday to have its own store end to end: a storefront where customers browse, add to cart, apply coupons and pay with Razorpay or COD, and an admin panel where the owner manages products, variants, stock, orders, coupons, banners, reviews, staff and sales reports. Both apps run on one backend.",
    decisions: [
      {
        title: "One API behind two separate frontends",
        why: "The storefront and admin panel are independent Next.js apps that use the same NestJS API, with shared TypeScript types in a monorepo package. Customers and staff get very different UIs, but there is only one place where business rules live, so a price or stock rule can't drift between the two apps.",
      },
      {
        title: "The server decides every price",
        why: "The client never sends a price or a total. At checkout the API reloads the cart, checks stock and product status, applies the coupon, shipping and GST itself, and freezes those numbers on the order. If an order is fully discounted to ₹0, the API settles it directly instead of sending a zero-amount payment to Razorpay, which would reject it and leave an order that could never be paid.",
      },
      {
        title: "No stock deducted before the money arrives",
        why: "A Razorpay order is created as PENDING. Stock is not touched and the coupon is not used up until payment is confirmed. An abandoned checkout never locks inventory or burns a limited-use coupon. COD orders are confirmed right away in a single database transaction.",
      },
      {
        title: "Short-lived access tokens with rotating refresh tokens",
        why: "The access token lives only in memory (never localStorage). The refresh token sits in an httpOnly cookie, is stored hashed in the database, and is replaced on every use. A stolen token stops working quickly, and logout actually revokes the session on the server.",
      },
      {
        title: "Every stock change is logged",
        why: "Stock changes from orders, cancellations, restocks or manual fixes all write an inventory adjustment row with a reason. The owner can see exactly why a count changed, and low-stock items show up on the admin dashboard.",
      },
    ],
    challenge:
      "Confirming payments exactly once. A Razorpay payment can be reported twice: by the browser right after checkout and by Razorpay's webhook, which retries until it gets a 200. Both paths check the HMAC signature (on the raw request body for webhooks) and then call a single confirmPayment function. That function marks the payment paid, deducts stock, redeems the coupon, confirms the order and clears the cart in one transaction. If the payment is already PAID it does nothing, so retries and races can't deduct stock twice or send two confirmation emails. One trade-off I accepted on purpose: because stock is only taken after payment, two buyers can both pay for the last unit. When that happens the API logs it as an oversell instead of letting stock go negative, so the owner can handle it.",
    images: [],
  },
  {
    slug: "agency-crm",
    name: "Agency CRM",
    kind: "Internal CRM for MiidayStudio",
    summary:
      "An internal CRM for a design-and-dev studio that turns inbox enquiries into a tracked pipeline, from lead to project to paid invoice.",
    year: "2026",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Motion", "Hono", "Cloudflare Workers", "Cloudflare D1"],
    source: "private",
    color: "#F5F5F4",
    links: {
      live: "https://miiday-crm.vikrantcode08.workers.dev",
    },
    problem:
      "At MiidayStudio, project enquiries arrived as emails, deals were remembered rather than tracked, and invoices lived in separate documents. I wanted one internal tool for the three founders: leads, clients, projects, tasks and GST invoices, with enquiry emails turning into leads on their own. It also had to run entirely on Cloudflare, with no servers to look after.",
    decisions: [
      {
        title: "Email in, lead out",
        why: "The studio's enquiries already land in an inbox, so the Worker also handles Cloudflare Email Routing. It parses 'Label: value' lines (name, organisation, capabilities, brief, repo) into a lead. The same parser backs a 'paste an email' box and a keyed webhook, so the website doesn't need to change.",
      },
      {
        title: "Workers and D1 for both halves",
        why: "A Hono API on a Worker with D1 (SQLite) for storage, and the React app served as Worker static assets. One platform, one bill, and deploys straight from GitHub. For a three-person team, a managed SQL database was plenty.",
      },
      {
        title: "Winning a lead creates the client and project",
        why: "Converting a lead creates the client (reusing one with the same email), opens a project with the brief and repo link carried over, and marks the deal won. Nobody retypes details between the pipeline and delivery.",
      },
      {
        title: "Overdue is computed, not stored",
        why: "A 'sent' invoice past its due date is reported as overdue when it is read, instead of by a scheduled job flipping a flag. There is no cron to fail, and the status can't go stale. Invoice totals and GST are worked out on the server, so the client can't submit its own total.",
      },
      {
        title: "No seeded password; access-code sign-up",
        why: "The first visit creates the founder account inside the app, so no default credentials ship in the repo. Teammates then join with a studio access code, or an admin adds them. Passwords are hashed with PBKDF2 through the Web Crypto API, which is what the Workers runtime offers.",
      },
    ],
    challenge:
      "Making first-run setup safe to fail. On the first deploy I hadn't set the signing secret, and account creation saved the founder to the database before trying to issue a login token. The token step crashed, which left a half-created admin that nobody had the password for and blocked setup from running again. I fixed it by checking the config before touching the database, so a missing secret now returns a clear error and writes nothing. I also added the access-code sign-up path and a safe way to reset the users table, then re-tested the flow against a real D1 database through wrangler.",
    images: [],
  },
  {
    "slug": "cutcrew",
    "name": "CutCrew",
    "kind": "Cross-platform streaming platform",
    "summary": "A movie, series and anime platform for web, Android, TV and Windows, with resilient playback and a backend built around PostgreSQL, FFmpeg and Telegram-backed storage.",
    "year": "2026",
    "stack": [
      "Node.js",
      "Express",
      "PostgreSQL",
      "React",
      "Vite",
      "JavaScript",
      "TypeScript",
      "React Native",
      "Expo",
      "Tauri",
      "Rust",
      "Python",
      "FastAPI",
      "FFmpeg",
      "HLS.js",
      "Docker",
      "Nginx"
    ],
    "source": "public",
    "color": "#000000",
    "labels": [
      "Public source",
      "Web · Android · TV · Windows"
    ],
    "note": "A public-source project with a web experience, a dedicated Android/TV app and a lightweight Tauri Windows shell. Web accounts sync libraries and progress; Android currently keeps its library on the device.",
    "links": {
      "github": "https://github.com/vikrant-choudhary06/CutCrew",
      "live": "https://web.cutcrew.click",
      "downloads": "https://github.com/vikrant-choudhary06/CutCrew/releases/latest"
    },
    "features": [
      {
        "title": "Discovery and personal libraries",
        "description": "Featured artwork, Top 10 movies, popular series, genre browsing, search, related titles, My List and Continue Watching. Web accounts support separate profiles, email verification and password recovery."
      },
      {
        "title": "A player that recovers",
        "description": "Resume movies and episodes, select quality and audio, use available subtitles, and continue with a next-episode countdown. The web player supports keyboard shortcuts and double-tap seeking; failed streams trigger alternate sources and providers."
      },
      {
        "title": "Anime and regional audio",
        "description": "A separate AniList-powered anime catalogue and anime providers, including sources for Hindi, Tamil and Telugu dubs. Audio and subtitle availability depends on the source."
      },
      {
        "title": "Apps beyond the browser",
        "description": "An Expo/React Native Android app supports phones, tablets and Android TV, including remote controls and player gestures. The Windows app is a Tauri/WebView2 shell for the live website. Android supports self-hosted JavaScript updates and new-APK update prompts."
      },
      {
        "title": "Stored copies and background imports",
        "description": "Telegram-backed storage serves ready copies through a media gateway. An optional auto-archive worker queues watched provider titles, checks compatibility and limits, then downloads, prepares, splits, uploads and verifies them without blocking playback."
      },
      {
        "title": "An operational admin panel",
        "description": "Admins can inspect live activity, playback and download statistics, manage provider switches, edit catalogue entries and operate stored-media and archive queues. Owner accounts manage other administrators."
      }
    ],
    "problem": "A title catalogue is only the beginning of a streaming app. Sources fail, links expire, files use codecs a browser cannot play, and people expect their episode progress to survive a refresh. CutCrew brings discovery, personal libraries and playback into one experience while keeping source resolution, media conversion and storage behind a shared backend.",
    "decisions": [
      {
        "title": "PostgreSQL for catalogue, accounts and queues",
        "why": "The current backend uses PostgreSQL rather than the older MongoDB/Mongoose implementation. Catalogue data, profiles, watchlists, progress and storage jobs have versioned SQL migrations. Migrations run inside a transaction with a database lock, and pooled connections have timeouts so stalled queries do not hold resources indefinitely."
      },
      {
        "title": "Account-backed web libraries, local Android libraries",
        "why": "On the web, cookie sessions and per-profile records keep saved titles and playback progress in PostgreSQL. Passwords use scrypt hashing, with verification and recovery routes. The Android app currently persists its library through AsyncStorage; I keep that distinction explicit instead of promising cross-platform sync that it does not implement."
      },
      {
        "title": "Recover playback before giving up",
        "why": "The player remembers the current position while switching sources. It can try another stream, refresh resolution, move away from a failed stored copy or request another provider. Repeated buffering can trigger a lighter converted stream. HLS.js handles adaptive playback, while diagnostics are sent without making playback wait for them."
      },
      {
        "title": "Inspect media and convert only when needed",
        "why": "FFmpeg-based services inspect media, remux or convert incompatible files, and support seek/audio changes by restarting work at the requested timestamp. Conversion concurrency and probe limits bound server load. This is on-demand processing, not a claim that every title is already CDN-transcoded."
      },
      {
        "title": "Separate provider adapters and a constrained runner",
        "why": "Movie and anime sources are grouped separately. Source adapters feed a common resolution pipeline, while selected JavaScript providers run through an allowlisted runner with timeouts and normalized responses. Admin switches can stop a provider from being queried or its cached links from being selected."
      },
      {
        "title": "Keep IMDb and anime metadata separate",
        "why": "A Python/FastAPI IMDb service supplies movie and series metadata. Anime uses AniList and its own provider-matching service, with cached matches, misses and episode results. The clients see a consistent catalogue without having to understand the upstream source layouts."
      },
      {
        "title": "Store verified copies without blocking viewers",
        "why": "A storage index tracks Telegram-backed copies and their readiness. The optional auto-archive worker checks for existing work, queues one title at a time and applies quality, size and daily limits before downloading. Preparation, splitting, upload and verification are separate steps; playback can fall back to provider sources when storage is unavailable."
      },
      {
        "title": "Share a backend across distinct clients",
        "why": "React/Vite powers the web experience; Expo/React Native provides a dedicated Android and TV UI; Tauri supplies the Windows shell. The Android app has its own player controls and update flow, while the Windows shell receives website changes through its live WebView."
      },
      {
        "title": "Make the system observable and operable",
        "why": "The admin panel exposes provider health, live activity, playback metrics, storage queues, download counts and catalogue editing. Owner/admin accounts use hashed passwords and cookie sessions. Docker Compose packages the frontend, backend, IMDb service and Telegram Bot API, with Nginx routing and readiness checks."
      }
    ],
    "challenge": "Preserving a continuous viewing experience across unreliable sources, different media formats and stored copies. A source can resolve but still buffer, fail to seek or expose an unsupported audio track. The player carries its current position through fallback, while the backend inspects and prepares media, signs access to stored content and limits expensive conversions. Background imports must avoid duplicate work and survive retries without blocking playback. The repository includes focused tests for accounts, catalogue, anime, audio, storage, archive jobs, admin tools and app updates; source inspection alone does not establish production capacity or guarantee that every upstream stream works.",
    "images": []
  },];

// Ordered by how much I've used each one, most first.
export const STACK: StackGroup[] = [
  {
    title: "Languages",
    items: ["TypeScript", "Go", "JavaScript", "SQL", "Python"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "Electron", "Wails"],
  },
  {
    title: "Backend",
    items: ["NestJS", "Express", "Fastify", "Hono", "FastAPI", "Razorpay", "Gemini API"],
  },
  {
    title: "Data",
    items: ["PostgreSQL", "Prisma", "Redis", "BullMQ", "MongoDB"],
  },
  {
    title: "Infra & tools",
    items: [
      "Cloudflare Workers",
      "Cloudflare D1",
      "Docker",
      { name: "Supabase", projects: ["opensourcehub"] },
      { name: "Playwright", projects: ["rizzoto"] },
      "Git",
    ],
  },
  {
    title: "Database internals",
    items: [
      { name: "Write-ahead log", projects: ["novacdb"] },
      { name: "MVCC", projects: ["novacdb"] },
      { name: "B+Trees", projects: ["novacdb"] },
      { name: "PostgreSQL wire protocol", projects: ["novacdb"] },
    ],
  },
  {
    title: "Real-time",
    items: [
      "Socket.io",
      { name: "Server-sent events", projects: ["rizzoto"] },
      { name: "Offline sync", projects: ["rizzoto"] },
    ],
  },
];

// Things I know well enough to talk through, but haven't shipped a project with yet.
export const ALSO_FAMILIAR: string[] = ["Django", "Flask", "React Native", "ScyllaDB", "Elasticsearch"];
