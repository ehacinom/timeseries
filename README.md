Conceptual path
=======
**Abstract**
Integrating the introduction we had to Tessel (hardware) and several other ideas I've had floating around, like writing an NPM module for working with timeseries data, the power of javascript to make great visualizations, streams (a topic of great personal interest), and sockets, which are fun.

**Tessel**
Our Tessel Hackathon sort of most directly lead to this module. We were given a few hours to experiment with a little Node.js server. My immediate response, from years doing geology and astrophysics research in academic settings, was do something with the data piping out of the Climate module (humidity, temperature). Maybe data representation somehow. Someone floated the idea of FFT, music, and I sort of got stuck trying to just get a simple graph out of it. I didn't understand how to get the data from the Tessel to a workable form -- maybe, to graph it.

**NPM**
I spent some time looking at NPM modules. Writing one seems like the height of awesomeness. I was looking for the perfect module for working with Tessel data, but I couldn't find the perfect one. For one thing, I learned that Tessel only works with pure-js module implementations. I learned it would be a really bad idea to send data over to my computer from the tessel server to write to file.

**Streams**
Working with data for a long time, I've used the concept of streaming and processing of data in memory. However, I never fully understood it. https://github.com/substack/stream-handbook

**Javascript visualizations**
My dream is to learn d3.js well.

**Sockets**
We used websockets in our twitter clone, and in our little project on Friday. I really like the interaction of each client being both a receiver and an emitter of messages.

**Fullstack**
I'd like to think that I could think of something like this without the structure of Fullstack,  but, not going to lie, absolutely _none_ of this would have happened without the quick iteration of so much information. The topics introduced were not new, which helped their accessibility, and they were presented in a way that encouraged me to a lot of things that are both personally interesting and challenging!


Day 1
============
**Saturday 13 May**

https://forums.tessel.io/t/using-websockets/821
Learning about network communication. 

> Written with [StackEdit](https://stackedit.io/).