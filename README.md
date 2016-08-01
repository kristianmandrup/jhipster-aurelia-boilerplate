# Jhipster Aurelia boilerplate

This [Aurelia](aurelia.io) project is designed to work as a starting point for using [Jhipster](https://jhipster.github.io) with Aurelia, the cooler brother of Angular ;)

We are also developing a client side [JHipster entity generator for Aurelia](https://github.com/kristianmandrup/aurelia-breeze-hipster-entity-generator)
using [Breeze.js](breezejs.com) for rich data management, syncing client and server.

- *Client Caching* Cache queried, new, and changed data on the client for a responsive UI.
- *Track Changes* Track changes, raise events, and validate using metadata and rules you write.
- *Rich queries* Query the server and client cache with filters, ordering, paging, and projections.
- *Mobile* Enable great mobile experiences that execute natively on any device.

Please help us improve the boilerplate and generator if you want to use JHipster with Aurelia ;)

## i18n

Uses the [aurelia-i18n](https://github.com/aurelia/i18n) as described [here](https://mttmccb.github.io/starting-with-aurelia-i18n/)

## Status

*WIP*

- All templates have been converted to Aurelia template syntax and use the new `<template>` element as per the Web Components spec.
- All `.js` files have been converted to ES6 classes using Aurelia injection, HTTP fetch client etc.
- The few special `$` angular methods such as `$.filter` have been imported from Angular to ensure functionality is the same as before.

## TODO

Test with jHipster apps and improve accordingly.

Integrate with [Breeze.js](breezejs.com) like the entity generator. Move the common EntityManager logic to this boilerplate or better, put in a separate module.

## Contributions

Please do :)

## License

MIT   
