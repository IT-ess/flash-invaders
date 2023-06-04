# flash-invaders

## Intro

This project is more or less a clone of the [flash-invaders](https://space-invaders.com/flashinvaders/) app and concept. It has been created for the 50th anniversary of the twinning between the french village La Tessoualle and German village Zwiefalten. 
The goal is to find some mosaics hidden in some place, and answer some quiz each time you've found a new mosaic. 

A live version is available on [zwietess.aloiseau.com](https://zwietess.aloiseau.com)

<img src="static/qrcode.png" alt="qrcode" width="200"/>

## Features and packages used

- Internationalization in French and German, with `svelte-kit-i18n`
- One time passwordless authentication with cookies made with `lucia-auth`
- Chrome and Firefox support

## Technical considerations

This project has been built with SvelteKit, that handles both front end and back end operations.
It uses a Redis database to store the invaders location and a Postgres database for the user data (with Prisma ORM).

The front end is styled with Tailwind CSS, and is **not** fully responsive since the app is meant to be used on mobile devices only. 

To start the project locally, fill in the environment variables (`yarn run db` can provide you a blank Postgres DB with Docker), and then run `yarn run dev`. 
You must add some entities to the Redis database to make the app work. There are three entities : 
- Invader :  defines the geolocation of the mosaic and its name
- Context :  provides some context (carousel photos, text...)
- Quiz : provides the quiz questions and options
You can find all the redis schemas under `/lib/server/models`

## Improvements

This was my very first full-stack application I made, so there is a room for a lot of improvements here :
- The Redis DB is not very useful, since its only required for the geolocation search method provided by `redis-om`. The rest of the data could be stored in a JSON locally. The use of Redis is the result of a bad technical choice at the beginning of the project. 
- The responsive and the global styling is very basic
- A lot of the code may be not generic enough to suit your needs, I had to hardcode a lot of things in the app, in order to deliver it on time for the event 