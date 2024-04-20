---
layout: posts
title:  "Free Cartography on Garmin Etrex 10 (and all other Garmin)"
date:   2099-01-01 12:18:22 +0200
categories: gis
canonical_url: 
---

Despite it is sold as a non-cartographic handled GPS device, with limited storage capacity of 10 MB and the inability to expand it, the **eTrex 10** GPS, like almost all Garmin devices, is capable of reading Garmin cartography in IMG format. However, the storage limitation prevents to use standard Garmin maps, which are hundreds of megabyte big, not well updated and expensive. We can overcome these limits by utilizing the vast resources of [OpenStreetMap](https://openstreetmap.org) (OSM), a collaborative mapping project that empowers users to contribute and update maps themselves.

I'd like to advocate for the eTrex 10 by highlighting its compatibility with OSM maps, which can be a game-changer for outdoor enthusiasts and adventurers, at a fair price of around 90$. With just 5 MB of storage, I have been able to map out half of *southern Sardinia*, including contour lines, thanks to OpenStreetMap.

Now, let's delve into two methods to integrate OpenStreetMap data into your Garmin device:


## The easy way: bbbike extract

The easiest way to obtain Openstreetmap maps in Garmin format, is to use [BBBike extractor service](https://extract.bbbike.org/). 

1. Select the are you want to download
2. Choose a Garmin format from the select box
3. Put your email and press the "Extract" button

Within minutes, your map file will be ready for download. Some Garmin devices, such as the eTrex, require the map file to be named `gmapsupp.img` for compatibility.


## Crafting Customized Maps

For those who enjoy tinkering and want to optimize their maps further, manual customization is an option:

    Use SRTM2OSM to obtain an OSM file of digital elevation models for your area of interest.
    Download roads and all OSM data for your area using services like overpass-api.de. You can select specific features, such as roads, trails, rivers, peaks, and notable points of interest like churches and railways.
    Utilize the mkgmap tool to create the .img file, combining contour lines and roads. You can also adjust parameters to simplify the road data for a smaller file size.

## Conclusions

Both methods are compatible with any Garmin device that supports the Garmin .img map format, ensuring you always have up-to-date maps at your fingertips. Whether you opt for the convenience of BBBike Extract or the customization of manual crafting, OpenStreetMap offers a wealth of possibilities for enhancing your outdoor adventures.

Have fun!

- [My Twitter Profile](https://twitter.com/dagide)
- [My Github Profile](https://github.com/dakk)
