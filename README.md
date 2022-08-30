<p align="center">
    <img src="./docs/images/agamotto_with_word.png">
</p>

# agamotto - Wheel Options Strategy Management

<p>
    <a href="https://www.python.org/">
        <img src="http://ForTheBadge.com/images/badges/made-with-python.svg">
    </a>
    <a href="https://flask.palletsprojects.com/en/2.0.x/">
        <img src="docs/images/bottled-in-flask.svg">
    </a>
</p>

**agamotto** is a Flask + React app for managing your Wheel options trading strategy. Like the MCU's [Eye of Agamotto](https://marvel.fandom.com/wiki/Eye_of_Agamotto), it allows you, the bold trader, to harness the power of ~~theta~~ time.

## Motivation
There aren't many free or open-source trading journals for options out there. And there are even fewer that implement my specific variant of the Wheel strategy, in terms of the metrics and rules I use. With no tool that meets my full set of  unique needs, the only *option* was to develop one from scratch.

## Installation and Usage
See the [documentation](https://chrischow.github.io/agamotto/getting_started) for the detailed instructions.

## Features
**agamotto** enables you to:

- Scan for put options to initiate a Wheel strategy
- Log put/call options and stock trades
- Monitor your open options trades, with recommendations to buyback or roll
- Get a high-level overview of your profits, broken down by strategy, ticker, and trade

This is just a high-level description. See the [documentation](https://chrischow.github.io/agamotto/user_guide) for a full walkthrough of the app.

## Stack
- Frontend: React
- Backend framework: Flask
- Database: MongoDB
- Container runtime: Docker (using Docker-Compose)

## Background on agamotto
This is the 3rd iteration of **agamotto**. The first was an options scanner built in Streamlit. I could identify trades with relatively good risk-to-reward ratio. However, these tickers did not produce a strong performance during paper trading because the underlying companies were relatively small and unstable, hence the high premiums and underestimated risk metrics. As I refined my strategy, I refined my toolkit.

The second iteration of **agamotto** was a 100% Flask app. There was no frontend library/framework - I simply dumped JavaScript into the templates that required them. As I was new to JavaScript at the time, my code was not particularly elegant, and the frontend code base was poorly organised. Another implication from being a JS newbie was that I found myself tweaking the backend to match what the frontend needed as closely as possible. This inevitably resulted in having to write less JavaScript code. However, V2 was still useful because it (1) taught me that the frontend experience is extremely important, (2) showed me that I needed to improve in frontend development, and (3) enabled me to discover app features that I now think are useful.

This time, I'm coming back to the project armed with a new skillset: React. I picked up React earlier this year and developed several [single-page applications (SPAs)](https://github.com/chrischow?tab=repositories&q=react&type=&language=&sort=). I will re-build **agamotto** with a React frontend and Flask backend (API only).

## Future Work
- Deployment:
    - [ ] Push container to Docker Hub
    - [ ] Set up GitHub Actions for CI
    - [ ] Develop **agamotto** cloud
- Admin:
    - [ ] Consider [Flask-Dance](https://flask-dance.readthedocs.io/en/latest/multi-user.html) for OAuth
- Dashboard:
    - TBC
- Monitor:
    - TBC
- Manage:
    - [ ] Upload CSV function - needs validation of dataframe
- Scan:
    - [ ] Enable creation of presets
- Analyse:
    - TBC
- Documentation:
    - Re-factor docs to installation + deployment for different platforms
        - [ ] Google App Engine (using containers)
        - [ ] Heroku
        - [ ] PythonAnywhere
- Publicity:
    - [ ] Launch on Reddit
    - [ ] Article on Medium.com

## About the Project
**agamotto** is © 2022 by Christian Chow.

### License
It is distributed under the [MIT License](LICENSE).
