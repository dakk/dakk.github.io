---
layout: posts
title:  "Free near real-time 10-meter resolution satellite imagery with 5 lines of code"
date:   2023-05-24 17:02:28 +0200
categories: python
canonical_url: https://medium.com/@dakk/free-near-real-time-10-meter-resolution-satellite-imagery-with-5-lines-of-code-d1f155778cab
---

![Satellite image](/assets/2023-05-24-image.webp)

Satellite imagery has been a game-changer in many fields, from meteorology and environmental sciences to city planning and real estate. The ability to look at our planet from above offers insights that ground-based observation cannot provide. However, accessibility to such high-resolution imagery has often been perceived as costly and complicated. It doesn't have to be!
The European Space Agency (ESA) has a wealth of satellite imagery that is not just high resolution (up to 10 meters) but also free to access, download, and use. This resource is provided through their Earth Observation Program, with the Copernicus mission at its heart.
Imagine the potential of this! Whether you're an environmental researcher looking to analyze deforestation, an urban planner in need of accurate city topography, or a tech enthusiast eager to experiment with satellite imagery data, you now have a powerful tool at your fingertips.

## Getting Started: Sign Up at Copernicus Scihub
To get started, you first need to sign up on Copernicus Scihub. This is ESA's gateway for satellite data distribution, offering petabytes of information just a few clicks away. The sign-up process is straightforward: go to the Copernicus Open Access Hub, click on the sign-up button, and fill in the required details. Make sure to remember your username and password because you will need them in the next steps.

## Access Satellite Imagery With Code

Now, let's get to the exciting part. First install sentinelsat with the following command:
```pip install sentinelsat```

Now with just 4 lines of Python code, you can access this treasure trove of satellite data. Here's the basic script:

```python
import fnmatch
from sentinelsat import SentinelAPI, make_path_filter

sapi = SentinelAPI('user', 'password', 'https://scihub.copernicus.eu/dhus/')
products = sapi.query(date=('NOW-1DAYS', 'NOW'), platformname='Sentinel-2', processinglevel='Level-2A')
sapi.downloadall(products, './tempdataset', nodefilter=lambda a: fnmatch.fnmatch(a['node_path'], '*_TCI_10m.jp2'))
```
In these four lines of code:
- We import the SentinelAPI module from the sentinelsat library. If you don't have the sentinelsat library installed yet, you can easily add it to your Python environment using pip: pip install sentinelsat.
- We create an instance of the SentinelAPI class, providing our Copernicus Scihub credentials and the URL of the Scihub server.
- We use the query method to search for available satellite imagery based on specific criteria.
Finally, we use the download_all method to download all the images that matched our query.

The beauty of this approach is its flexibility. You can adjust the query parameters based on your specific needs, like the date range, the satellite platform, or the acceptable cloud cover percentage.
It's that simple! Now, you can start exploring, analyzing, and using high-resolution satellite imagery, free of charge, and with just a few lines of code. The sky is not the limit; it's the starting point!



Article on [medium](https://medium.com/@dakk/free-near-real-time-10-meter-resolution-satellite-imagery-with-5-lines-of-code-d1f155778cab).