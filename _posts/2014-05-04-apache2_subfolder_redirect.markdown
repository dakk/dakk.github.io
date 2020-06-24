---
layout: post
title:  "Apache2: redirect different domains to subfolder"
date:   2014-05-04 00:00:01 +0200
categories: sys
---
In the aim to merge two of my server on digitalocean, today I tried to write a mod_rewrite rule to redirect a secondary domain to a subfolder. After one hour, I found that I can do that with a VirtualHosts.

Just edit the file /etc/apache2/sites-available/default and add a rule for each domain at the end of file:

```
<VirtualHost *:80>
ServerName http://www.domain.org
DocumentRoot /var/www/vhosts/domain.org/www
</VirtualHost>
```

It’s easy, if you know.