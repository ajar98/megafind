# Megafind
## Summary 
Megafind is a webapp based platform for hosting live lecture sessions. Professors can begin a session that students in the lecture can join using some provided passcode. Upon joining the live session, students gain access to multiple features that provide an enhanced lecture experience. The dashboard has 3 main features: 
1. The first is simply the lecture slides embedded into the left half of their screen––this is for them to follow along with the presentation. 
2. The right side contains two tabs. One of which is a live transcript of what the professor is saying that updates in real time. The app parses the professor's words in real time to find relevant people, places etc. Each term deemed relevant has a hyperlink to additional resources. These keywords are also stored in a digest that we will send at the end.
3. The third feature, is a in browser note taker that begins lecture with all the bullet points/text scraped from the powerpoint presentation. This way, students can focus on putting their own thoughts/notes instead of simply copying the lecture bullets because we've done that for them. 

At the end of the lecture, Megafind sends each student a copy of their "lecture digest" which contains 3 parts:
1. A summary of the lecture using the transcript we have compiled.
2. The notes that they took on top of the bullets we provided.
3. Each keyword that we picked up on compiled into a list with a short summary of its definition (for study guides/quick reference).

##How to Use:
1. Clone the repo and download the dependencies by writing'npm install' and 'npm install mongodb'
2. Download [ngrok](https://ngrok.com/download)
3. Go into your directory that has ngrok
4. Run the following command 'export GOOGLE_SEARCH_API_KEY=AIzaSyBVuS6VE_gQVgjDOLb17x86Gldf1rIJg4A'
5. Run the following command './ngrok http 3000'
6. Replace the usages of anything with ngrok in the files with the provided url from step 5
7. Go back to the main directory and run 'node server.js'
8. Open up https://your_ngrok_url.io/live and https://your_ngrok_url.io/professor
9. Click Start Lecture on the professor tab and then migrate to the live tab. 
10. Go through the slides, view the slides, and write the notes as you please.
11. Terminate the session by going to the professor tab and press Stop Lecture
