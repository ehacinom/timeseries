Climate tessel streams data through websockets to d3/cube/cubism.js (timeseries) for realtime graphing. And publish either an npm module or an example to the tessel codebase, or the beginnings of a short Fullstack workshop.

Conceptual path
=======
**Abstract**
Integrating the introduction we had to Tessel (hardware) and several other ideas I've had floating around, like writing an NPM module for working with timeseries data, the power of javascript to make great visualizations, streams (a topic of great personal interest), and sockets, which are fun. 

**Tessel**
Our Tessel Hackathon sort of most directly lead to this module. We were given a few hours to experiment with a little Node.js server. My immediate response, from years doing geology and astrophysics research in academic settings, was do something with the data piping out of the Climate module (humidity, temperature). Maybe data representation somehow. Someone floated the idea of FFT, music, and I sort of got stuck trying to just get a simple graph out of it. I didn't understand how to get the data from the Tessel to a workable form -- maybe, to graph it.

**NPM**
I spent some time looking at NPM modules. Writing a library/module seems like the height of awesomeness. I was looking for a module for working with Tessel data, but I couldn't find the perfect one. For one thing, I learned that Tessel only works with pure-js module implementations. I learned it would be really inefficient to send data over to my computer from the Tessel server to write to file.

**Streams**
Working with data for a long time, I've often used the concept of streaming and processing of data in memory. However, I never fully understood it. The first step was the oft-referenced "[stream handbook](https://github.com/substack/stream-handbook)" that a classmate referred me to.

**Javascript visualizations**
My dream is to learn d3.js well.

**Sockets**
We used web sockets in our Twitter clone, and in our little whiteboard project. I really like the interaction of each client being both a receiver and an emitter of messages. Sockets also lend themselves really well to real-time data, and timeseries, and javascript is *the* language for showcasing dynamic web pages! Perfect. Moreover, using websockets allows me to explore some internet-enabled hardware, which another classmate here has introduced me to, this term the "Internet of Things". 

**Fullstack**
I'd like to think that I could think of something like this without the structure of Fullstack, but, not going to lie, absolutely _none_ of this would have happened without the quick iteration of so much information. The topics introduced were mostly not new, which helped their accessibility, and they were presented in a way that encouraged me to a lot of things that are both personally interesting and challenging!


Timeline
============

Days 1-2: **Saturday 13 May** and **Wed 14 June**

http://tessel.github.io/t2-start/modules/climate.html
Tessel climate module tutorial

https://forums.tessel.io/t/using-websockets/821
Learning about network communication. 



Process
====================
**Setup**

 1. I assume you have Node & NPM.
 2. Fork or clone [the repo](https://github.com/ehacinom/timeseries).
 3. `npm i`, `npm install -g t2-cli climate-si7020`. The command line tool is unable to be installed locally, I think. Possibly `t2 init` to initialize a Tessel project file.
 4. Setup hardware. Tessel->USB->laptop. Climate module->PortA on Tessel. Blue light means the Tessel is connected to battery
 5. Find your Tessel. `t2 list`,  `t2 rename YOURTESSELNAME`.
 6. Connect to wifi. This has to be the same network (ie, same wifi name and password) as your computer, as you're not going to use fully-internet-enabled WebSockets, just sockets. Your Tessel will be the server, your computer will host a client using a Node server. `t2 wifi -n NETWORK -p PASSWORD`. Remember that in bash shell, single quotes around your password will escape all characters except the single quote itself.[^escapebash] If you are having troubles connecting Tessel to the same network your computer is on, be aware that the allowed protocols/permissions for the Tessel and the wifi network may not be the same. 
 
 To avoid having problems at Fullstack, I used my iPhone to share a Personal Hotspot, and connected my computer and the Tessel to it. Changing the security of either Tessel or the wifi router seemed more complicated than this. However, on AT&T, Personal Hotspot is off your data plan, even if you are using wifi on your phone, so be careful of usage.
 7. You'll need your Tessel's Private IP address. There's a few ways of retrieving it. If you type in `t2 wifi`, it should show up. Otherwise, in 
 8. `t2 update`

**Notes**

All your tessel code will be in `tessel-code`. ES6 is supported on Tessel only in `strict` mode.

**Test Scripts**

There are two test scripts in `/00-blink` and `/01-climate`. These set up to make sure your Tessel is internet (intranet, in this case)-enabled, and to test that [climate data](http://tessel.github.io/t2-start/modules/climate.html) is coming off the module. It would be good to run these. Running Javascript files from your command line on the Tessel is easy:

    t2 run filename.js

**Setup texting sockets**

Head into the `tessel-code/02-textSocket` folder. You'll need to run two files on two servers: Node on your laptop, and t2 on your tessel!

    t2 run textServer.js
wait until the server prints out that is listening on port 8000, then

    node textClient.js

The Node client will send a text to the Tessel server; it will receive and send it back to the client. There are event listeners for the "text" event.

If you get `Error: connect ECONNREFUSED tesselIP:8000` it is likely you are not on the same network. Your tessel and your phone be on the same network, unless you change the permissions (see Setup #6).

**Setup streaming**

Head into  `tessel-code/03-streamSocket` folder. Same thing, running two servers.

    t2 run streamServer.js // wait for connection confirmation
    node streamClient.js

The Tessel server listens for binary streams, and pipes it to stdout. Note that the websockets only take information from the client, and do not broadcast. Changes in tessel CLI don't propagate to the Node client server. This also works with multiple clients!

On the client, the `websocket.setBinaryFragmentation(n)` sets the minimum bytes before a create a stream is created, and the default is 500kB. It also creates a binary socket stream with the server by 

    var socketStream = connection.beginBinary()

and pipes the input data to the Tessel at the other end of the connection by 

	process.stdin.pipe(socketStream)

**Streaming the other way!**
Now, let's go to `tessel-code/04-streamClimate` to stream climate data to the node client/your laptop. Run 

    t2 run streamServer.js
    node streamClient.js

The client script is very basic: it connects to the server, and when the server streams data over, it logs it out.

A lot is happening in the server script. 

This section is where I learned the most about streams. Readable streams should be piped to the next handler, e.g. `process.stdout`, whereas writeable streams are written to. This seems like an obvious distinction, but I spent a morning figuring this out.

other
=======


> Written with [StackEdit](https://stackedit.io/).

[^escapebash]: http://stackoverflow.com/a/20053121/2553191
