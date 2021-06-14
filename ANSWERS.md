# Answers

## 1. What is a URL shortening system?
  > A URL shortening system is a simple system that takes a long, complicated URL and compacts it into a short link for you to share.
## 2. What's the main value? Who needs such a system and why?
  > I think this system is mostly needed by marketing professionals, salesemen and SEO specialists. Some of the reasons for using the system could be:
  >>
	* some apps and websites don't allow sending URLs that are too long
	* beautifying or branding your URLs
	* shortening a lenghtly domain
	* tracking traffic - when you need to track the efforts of a social post or campaign. This is worthwhile when a link is sending traffic to your site, but especially when it's not.
## 3. Describe The main mechanism of work and system components.
  >When client sends the long url, the User module will transform it to a short url and return it to the user. The user can then choose to follow the link
	in which case the server will redirect him to the correct long url. As for the admin stats page, when the route is hit it will trigger a database query which will return the most popular urls in the last 24 hours 
## 4. What do you think are the main challenges in implementing and running the system
  >For now I think the main challenge is securing the process 
## 5. Try to suggest some ideas for advanced features.
  >Custom domain links, custom path and deep links 