---
title: "StorMIC Setup Guide: Free Self-Hosted P2P Voice Chat With Zero Data Retention"
titleTr: "StorMIC Kurulum Rehberi: Ücretsiz, Kendi Sunucunda P2P Sesli Sohbet"
description: "How to deploy the StorMIC signaling server for free on Render.com, download the desktop app, and connect it to your own server. A privacy-first Discord alternative that stores nothing."
descriptionTr: "StorMIC sinyal sunucusunu Render.com üzerinde ücretsiz kurma, masaüstü uygulamasını indirme ve kendi sunucuna bağlama rehberi."
excerpt: "Deploy your own signaling server in about five minutes, paste one URL into the app, and talk to your friends over a connection that keeps no records at all."
excerptTr: "Yaklaşık beş dakikada kendi sinyal sunucunu kur, uygulamaya tek bir URL yapıştır ve hiçbir kayıt tutmayan bir bağlantı üzerinden konuş."
date: "2026-07-17"
category: "Open Source"
categoryTr: "Açık Kaynak"
tags:
  [
    "StorMIC",
    "WebRTC",
    "P2P",
    "Electron",
    "Self-Hosted",
    "Privacy",
    "Voice Chat",
    "Signaling Server",
    "Render.com",
    "Node.js",
    "WebSocket",
    "Discord Alternative",
    "Open Source",
    "Free Hosting",
    "Screen Sharing",
    "End to End",
    "No Data Retention",
    "Desktop App",
    "StorMIC setup",
    "StorMIC installation",
    "self hosted voice chat",
    "private voice chat app",
    "peer to peer chat",
  ]
tagsTr:
  [
    "StorMIC",
    "WebRTC",
    "P2P",
    "Electron",
    "Kendi Sunucunda",
    "Gizlilik",
    "Sesli Sohbet",
    "Sinyal Sunucusu",
    "Node.js",
    "Açık Kaynak",
    "Ücretsiz Kurulum",
    "Ekran Paylaşımı",
    "Veri Tutmayan",
    "Masaüstü Uygulama",
  ]
featured: true
author: "Muhammed Metehan Yıldırım"
published: true
readTime: 12
---

# StorMIC Setup Guide: Free Self-Hosted P2P Voice Chat With Zero Data Retention

> This guide walks a regular user through two things: putting the StorMIC signaling server online for free, and pointing the StorMIC desktop app at it. You do not need to be a backend developer. If you can copy a URL and paste it into a text box, you can finish this in under ten minutes.
>
> Repositories: [StorMIC (desktop app)](https://github.com/MMetehan/StorMIC) and [StorMIC-Backend (signaling server)](https://github.com/MMetehan/StorMIC-Backend)

---

## Table of Contents

1. What StorMIC actually is
2. Why it ships as two separate pieces
3. The real point: a communication channel that keeps nothing
4. What you need before you start
5. Step 1: Deploy the signaling server for free on Render.com
6. Step 2: Verify the server is alive
7. Step 3: Download the desktop app from Releases
8. Step 4: Connect the app to your server
9. Step 5: Create a channel and invite someone
10. Other hosting options (Heroku, VPS, PM2, local)
11. The free tier and the cold start problem
12. Troubleshooting common errors
13. What the server can and cannot see
14. FAQ

---

## 1. What StorMIC actually is

StorMIC is a desktop voice and chat application built with Electron. It does voice with push to talk or open mic, camera sharing, screen sharing at up to 1080p and 60 fps, text chat, and drag and drop file transfer. On the surface it looks like the tools you already use every day.

Underneath, it works in a fundamentally different way. Your audio, your video, your messages, and your files never touch a server. They travel directly from your computer to the other person's computer over WebRTC. The only server in the picture is a tiny WebSocket relay whose entire job is to introduce two people to each other, and then get out of the way.

That relay is called the signaling server, and it is the part you are going to host yourself. It is the reason this guide exists.

---

## 2. Why it ships as two separate pieces

Most chat applications hand you one installer and quietly point it at infrastructure owned by whoever wrote the app. You never see that infrastructure. You cannot inspect it, you cannot move it, and you have no way to confirm what it does with your traffic. You are trusting a promise.

StorMIC breaks that arrangement on purpose. The app and the server are two repositories because they are meant to be owned by two different people: I wrote the code, and you run the server. There is no shared StorMIC backend sitting somewhere with everyone's channels on it, because I deliberately did not build one. When you deploy the signaling server, the address it lives at belongs to you, the machine it runs on is billed to you, and the only people who can reach it are the ones you hand the URL to.

The desktop app is distributed through GitHub Releases as a plain installer, with no server address baked into it by default. That is also intentional. An installer that already knows where to phone home is an installer that made a decision on your behalf. This one asks you instead.

The result is a small amount of setup work that I am not going to pretend away. You trade five minutes of clicking for infrastructure that answers to you rather than to me. For a tool built around private conversation, that trade is the entire product.

---

## 3. The real point: a communication channel that keeps nothing

Both repositories state the same thing, and it is worth being precise about what it means in practice.

**No message storage. No user accounts. No persistence of any kind.**

The signaling server holds all of its state in memory. It knows which usernames are currently sitting in which channel, for exactly as long as they are sitting there. When the last member leaves a channel, the channel is deleted. There is no database attached to the server, because there is nothing to write to a database. The full dependency list is a single package, `ws`, for WebSocket support. No auth layer, no ORM, no analytics, no external services.

Here is what the traffic actually looks like:

```
Client A ──ws──► Server ──ws──► Client B
         join and signal relay only

Once WebRTC is established:
Client A ◄──────── WebRTC P2P ────────► Client B
         (audio, video, chat, files)
```

The server sees two things: a channel code and a username, plus the connection metadata (SDP offers and answers, ICE candidates) that two peers need in order to find a direct route to each other. It never sees a single word you type or a single second of what you say. Once the direct connection is up, the server's only remaining job is to notice when somebody joins or hangs up.

Chat messages travel over a WebRTC data channel. Files are chunked into 16 KB binary pieces and sent over that same direct channel. Your camera and screen go peer to peer as media tracks. None of it is routed through anything you would need to trust.

There is exactly one place where anything persists, and it is on your own machine: `localStorage` holds your preferences, your selected microphone and speakers, your last used username, and the signaling server URL you entered. Nothing leaves your computer to be remembered somewhere else.

This is what "a communication channel that keeps no data" means here. Not a policy. Not a setting you can toggle. There is no storage layer in the architecture to turn off.

---

## 4. What you need before you start

- A GitHub account, free
- A Render.com account, free, which you can create with your GitHub login
- A Windows, macOS, or Linux desktop
- One friend to talk to, since a voice channel with one person in it is a lonely test

You do **not** need Node.js, a credit card, a domain name, or a server of your own. Render handles all of that. Node.js only matters if you choose to run the server locally, which is covered later.

---

## 5. Step 1: Deploy the signaling server for free on Render.com

The backend repository already contains a `render.yaml` blueprint, so Render can configure the whole service by reading the repo. You will not be typing any commands.

**5.1 Fork the backend repository**

Open [github.com/MMetehan/StorMIC-Backend](https://github.com/MMetehan/StorMIC-Backend) and click **Fork** in the top right. This copies the repo into your own GitHub account. Render needs it under your account so it has permission to read and deploy it.

**5.2 Create a Blueprint on Render**

1. Sign in at [render.com](https://render.com), using **Sign in with GitHub** if you want to skip a step
2. Click **New** in the top right, then choose **Blueprint**
3. Pick your forked `StorMIC-Backend` repository from the list
4. Render reads `render.yaml` and fills in the settings automatically. For reference, this is all it contains:

```yaml
services:
  - type: web
    name: stormic-server
    runtime: node
    buildCommand: npm install
    startCommand: node index.js
    envVars:
      - key: NODE_ENV
        value: production
```

5. Leave the instance type on **Free** and click **Apply**

Render installs the single dependency and starts the server. This usually takes about a minute.

**5.3 Copy your server URL**

When the deploy finishes, Render shows a URL that looks like this:

```
https://stormic-server-abc1.onrender.com
```

That address is your server. Copy it and keep it somewhere handy. In the next steps you will convert `https://` to `wss://`, since the app connects over a secure WebSocket rather than a web page:

```
wss://stormic-server-abc1.onrender.com
```

Same address, different protocol prefix. Render already gives you TLS on that domain, so `wss://` works immediately with no certificate setup on your side.

---

## 6. Step 2: Verify the server is alive

Before touching the app, confirm the server is actually responding. Open the `https://` version of your URL in a browser with `/health` on the end:

```
https://stormic-server-abc1.onrender.com/health
```

You should see the word `ok`. That endpoint returns `200 OK` with the body `ok`, and it exists precisely so that platforms and uptime monitors can poll it. If you see `ok`, your server is running and you can move on.

If the page takes fifteen or twenty seconds on the first try, that is the free tier waking up, not a failure. Section 11 explains why.

---

## 7. Step 3: Download the desktop app from Releases

You are not building anything here. Go to the [StorMIC releases page](https://github.com/MMetehan/StorMIC/releases) and grab the installer for your platform from the latest release, which at the time of writing is **v2.4.1**.

Each release publishes prebuilt binaries for Windows, macOS, and Linux under **Assets**. Expand that section and pick the file that matches your operating system, then install it the way you would install anything else.

A note for macOS and Windows users: StorMIC is an independent open source project without a paid code signing certificate, so your operating system may warn you that the developer is unidentified. On macOS you can right click the app and choose **Open** to get past Gatekeeper. On Windows you may need to click **More info** and then **Run anyway** on the SmartScreen prompt. If that makes you uncomfortable, the source is public and the build commands are in the repository, so you can compile it yourself and trust your own binary instead.

---

## 8. Step 4: Connect the app to your server

This is the step that ties the two halves together, and it is a single text field.

Launch StorMIC. Because no server URL is baked into the public builds, the app starts without a default and expects you to supply one. Open the **Settings** panel using the gear icon, find **Signaling Server URL**, and paste in your `wss://` address:

```
wss://stormic-server-abc1.onrender.com
```

You can also set it from the channel screen's server configuration toggle before joining anything. Both paths write to the same place.

The URL is saved to `localStorage`, so you enter it once and the app remembers it on every future launch. For anyone curious about the internals, the app resolves the URL in this order:

1. **`localStorage`**, the URL you typed into the Settings panel, which overrides everything else
2. **`signal-url.js`**, a URL baked in at build time from a `.env` file, only present if you built the app yourself
3. **`process.env.STORMIC_SIGNAL_URL`**, a system environment variable for advanced setups
4. **Empty**, in which case the app waits for you to configure it in Settings

Downloaded releases land on option 4 and you move them to option 1. That is the whole flow.

**Everyone who joins your channel needs the same URL in their copy of the app.** Two people pointed at two different signaling servers cannot see each other, no matter how correct the channel code is. Send your friends the `wss://` address along with the channel code.

---

## 9. Step 5: Create a channel and invite someone

1. Enter a username, which is remembered for next time
2. Create a channel with a code of your choosing, which is any string you and your friends agree on
3. Have your friend enter the same server URL, the same channel code, and a different username
4. Their client sends a `join` message, your server replies with the current peer list, and the two clients negotiate a direct WebRTC connection between themselves

From that moment on, your server is a bystander. Push to talk, screen share, drag a file into the chat window, and none of it goes anywhere near Render.

The channel exists only while somebody is in it. Close the app on both ends and the channel is gone from memory, with nothing left behind to delete.

---

## 10. Other hosting options

Render is the shortest path, but nothing about StorMIC requires it.

### Run it on your own computer

Useful for testing, or for a LAN party where everyone is on the same network. You need Node.js 18 or newer:

```bash
git clone https://github.com/MMetehan/StorMIC-Backend
cd StorMIC-Backend
npm install
npm start          # production
npm run dev        # auto restart on file changes
```

The server listens on port `3000` by default. Override it with an environment variable:

```bash
PORT=8080 npm start
```

Then point the app at `ws://localhost:3000`. Note the single `s`: plain `ws://` is fine on localhost, but not over the public internet.

### Heroku

A `Procfile` is included:

```bash
heroku create your-app-name
git subtree push --prefix server heroku main
```

Then use `wss://your-app-name.herokuapp.com` as your URL.

### Any VPS or cloud server

```bash
git clone https://github.com/MMetehan/StorMIC-Backend
cd StorMIC-Backend
npm install
PORT=3000 node index.js
```

Put a reverse proxy with a TLS certificate in front of it so clients get `wss://` rather than `ws://`. Here is a working nginx configuration, with the WebSocket upgrade headers being the part people usually forget:

```nginx
server {
    listen 443 ssl;
    server_name signal.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/signal.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/signal.yourdomain.com/privkey.pem;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
    }
}
```

### Keep it running with PM2

On a VPS, a bare `node index.js` dies the moment you close your terminal. PM2 fixes that:

```bash
npm install -g pm2
pm2 start index.js --name stormic-server
pm2 save
pm2 startup        # restart automatically after a reboot
```

---

## 11. The free tier and the cold start problem

Render's free tier suspends your service after 15 minutes with no traffic. The next connection wakes it back up, which takes roughly 30 to 50 seconds.

In practice this means the first person to join after a quiet evening waits a bit. StorMIC absorbs this reasonably well because the client reconnects with exponential backoff, starting at 1.5 seconds and doubling up to a 30 second cap, so it keeps retrying while the service boots instead of throwing an error at you.

If the wait annoys you, there are three ways out. Upgrade to a paid Render instance and the service never sleeps. Or run the server on a VPS you already pay for. Or accept the cold start, since once the connection is established the server is irrelevant anyway and its sleep schedule stops mattering for the rest of the call.

I would not add a keep alive pinger just to game the free tier. If the project matters enough to you to keep a server warm around the clock, it probably deserves the few dollars a month.

---

## 12. Troubleshooting common errors

The server sends back exactly two error codes, and both are self explanatory once you know what they mean.

| Error code          | What happened                                    | What to do                                                        |
| ------------------- | ------------------------------------------------ | ----------------------------------------------------------------- |
| `CHANNEL_NOT_FOUND` | You tried to join a channel that does not exist  | One person must create the channel first, and it disappears when the last member leaves |
| `USERNAME_TAKEN`    | Somebody in that channel already has your name   | Pick a different username                                          |

`CHANNEL_NOT_FOUND` catches people out most often, and it is a direct consequence of the no persistence design. Channels are not records in a database that sit there waiting for you. They exist only while somebody is inside. If everyone leaves and you try to rejoin the same code, you are creating it again, not returning to it.

Other things that go wrong:

**The app cannot connect at all.** Check that your URL starts with `wss://` and not `https://` or `ws://`. Then load `/health` in a browser to confirm the server is up. If it is a free Render instance, wait through the cold start and let the reconnect logic do its work.

**You are in the channel but cannot see your friend.** You are almost certainly on two different signaling servers. Compare the URL in both Settings panels character by character.

**Voice connects but nobody hears you.** That is a local media problem, not a server problem. Open Settings, confirm the right microphone is selected as your input device, and check whether push to talk is on with a key you have not pressed.

**Everything worked yesterday and now it does not.** If your Render service was redeployed it keeps the same URL, so that is rarely the cause. Check `/health` first, since it isolates a server problem from an app problem in about five seconds.

---

## 13. What the server can and cannot see

Worth stating plainly, because "peer to peer" gets used loosely enough that the word has lost most of its meaning.

**Your signaling server sees:**

- The channel codes currently in use, in memory only, for as long as somebody is in them
- The usernames currently connected to those channels
- SDP and ICE metadata, which is the technical description of how two peers can reach each other, including IP address candidates

**Your signaling server never sees:**

- Audio
- Video or screen shares
- Chat messages
- Files
- Anything at all after the direct connection is established

That IP address point deserves honesty rather than marketing. WebRTC works by having peers discover routes to each other, and those candidate addresses pass through the signaling server during the handshake. Peers also learn each other's addresses, because that is how a direct connection is a direct connection. StorMIC is built for talking with people you know, not for anonymity against people you do not. It hides your conversation from the infrastructure. It does not hide your existence from the person you called.

And since the server is yours, the party seeing that metadata is you.

---

## 14. FAQ

**Do I have to run a server? Can I just use yours?**
There is no "mine." No shared StorMIC backend exists, which is the point of the whole design. Deploying your own on the free tier takes about five minutes, and section 5 is the entire process.

**Is it really free?**
Yes, on Render's free tier, with the cold start caveat from section 11. The server's only dependency is `ws`, so there is no database bill and no third party service to subscribe to.

**How many people fit in a channel?**
StorMIC creates a peer connection to every other participant, so traffic grows with the square of the group size. It is built for small groups: a handful of friends rather than a hundred person town hall. Your upstream bandwidth is the practical ceiling, particularly with screen sharing on.

**Can I share one server with my whole friend group?**
Yes, and that is the expected setup. One person deploys, everyone else pastes the same `wss://` URL into Settings. Anyone with the URL can create channels on it, so treat it as a group resource rather than a public one.

**Does the app auto update?**
No. New versions land on the [releases page](https://github.com/MMetehan/StorMIC/releases) and you install them yourself.

**Do I need to redeploy the server when the app updates?**
Usually not. The signaling protocol is small and stable. If a release ever requires a server change, it will say so in the release notes.

**Can I read the code?**
Both repositories are MIT licensed and public. The client is roughly 1500 lines of vanilla JavaScript with no frameworks, and the server is small enough to read over a coffee. If you are going to trust software with your conversations, being able to read it is not a small feature.

---

## References

- [StorMIC desktop app](https://github.com/MMetehan/StorMIC)
- [StorMIC signaling server](https://github.com/MMetehan/StorMIC-Backend)
- [Latest releases](https://github.com/MMetehan/StorMIC/releases)
- [Render.com](https://render.com)
- [WebRTC documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
