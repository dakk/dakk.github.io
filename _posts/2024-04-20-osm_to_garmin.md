---
layout: posts
title:  "Free Maps on Garmin eTrex 10 (and all Garmin GPS)"
date:   2024-04-20 17:00:22 +0200
categories: gis
canonical_url: https://medium.com/@dakk/free-maps-on-garmin-etrex-10-and-all-garmin-gps-2ead846ffd21
---

Despite it is sold as a non-cartographic handled GPS device, with limited storage capacity of 10 MB and the inability to expand it, the **eTrex 10** GPS, like almost all Garmin devices, is capable of reading Garmin maps in IMG format. However, the storage limitation prevents to use standard Garmin maps, which are hundreds of megabyte big, not well updated and expensive. We can overcome these limits by utilizing the vast resources of [OpenStreetMap](https://openstreetmap.org) (OSM), a collaborative mapping project that empowers users to contribute and update maps themselves.

![Garmin eTrex 10](/assets/osm_to_garmin/garmin_etrex.jpg)

I'd like to advocate for the eTrex 10 by highlighting its compatibility with OSM maps, which can be a game-changer for outdoor enthusiasts and adventurers, at a fair price of around 90$. With just 5 MB of storage, I have been able to map out half of *southern Sardinia*, including contour lines, thanks to OpenStreetMap.

Now, let's delve into two methods to integrate OpenStreetMap data into your Garmin device:


## The easy way: bbbike extract

The easiest way to obtain Openstreetmap maps in Garmin format, is to use [BBBike extractor service](https://extract.bbbike.org/). 

1. Select the are you want to download
2. Choose a Garmin format from the select box
3. Put your email and press the "Extract" button

![BBBike export example](/assets/osm_to_garmin/bbbike_export.png)

Within minutes, your map file will be ready for download. Some Garmin devices, such as the eTrex, require the map file to be named `gmapsupp.img` for compatibility.


## Crafting Customized Maps

For those who enjoy tinkering and want to optimize their maps further, manual customization is an option; this method allow for instance selecting only desidered OSM features, add contour lines, simplify tracks, etc.

### 1. Download osm data

Download roads and all OSM data for your area using [Overpass-api services](https://wiki.openstreetmap.org/wiki/Overpass_API) like overpass-api.de. You can select specific features, such as roads, trails, rivers, peaks, and notable points of interest like churches and railways.

First you need to define an osm-script containing your query; you can write it in XML or OverpassQL; use this wiki as reference: [Overpass_API#Simple_usage_examples](https://wiki.openstreetmap.org/wiki/Overpass_API#Simple_usage_examples).

The most important thing you have to specify in the query is the bounding box of the area you want to download.


```xml
<osm-script timeout="900" element-limit="1073741824">
  <bbox-query s="51.15" w="7.0" n="51.35" e="7.3"/>
  <print/>
</osm-script>
```

After defining and saving your query, use wget or similar software in order to download osm data:

```
wget --post-file=your_query_file.xml -O map.osm http://overpass-api.de/api/interpreter
```


### 2. Create contour lines (optional)

If you are going to use this map for outdoor sports, sometimes is useful to also have contour lines.

![Contour lines](/assets/osm_to_garmin/contour.png)

You can use [Srtm2Osm](https://wiki.openstreetmap.org/wiki/Srtm2Osm) to obtain an OSM file of digital elevation models for your area of interest.


### 3. Transform .osm to .img

Now that we have openstreetmap data files, we can use a tool named [**mkgmap**](https://www.mkgmap.org.uk/) in order to convert those file to a Garmin .img file. 

This is the command I use, but it can customized with parameters in order to fit with your needs:

```
mkgmap --reduce-point-density=3 --gmapsupp --input-file=contour.osm --input-file=map.osm --merge-lines 
```

- `--reduce-point-density`: simplifies lines
- `--gmapsupp`: create a gmapsupp map file
- `--merge-lines`: try to merge straight lines

Now copy the file to your device, using an appropriate name and it's done.


## Conclusions

Both methods are compatible with any Garmin device that supports the Garmin .img map format, ensuring you always have up-to-date maps at your fingertips. Whether you opt for the convenience of BBBike Extract or the customization of manual crafting, OpenStreetMap offers a wealth of possibilities for enhancing your outdoor adventures.

Have fun!

- [My Twitter Profile](https://twitter.com/dagide)
- [My Github Profile](https://github.com/dakk)
