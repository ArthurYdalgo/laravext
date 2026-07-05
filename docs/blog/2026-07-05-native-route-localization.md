---
title: Native route localization support
authors: [arthurydalgo]
---

Native route localization support has been added to Laravext. This means that you can now define your routes in multiple languages, and Laravext will automatically handle the localization for you. Add a /lang/*/routes.php file for each language you want to support, and Laravext will automatically load the routes for the available locales. 

To start using this, simply enable `config('localization.enabled')` in your `/config/laravext.php` file, and make sure to define your routes in the `/lang/*/routes.php` files that correnspond to the `config('languagel.locales')`. 
You can check more details about this in the [Localization](/docs/localization) and in the [Configuration](/docs/configuration#localization) sections of this documentation.

<!-- You can check other available configs at  -->