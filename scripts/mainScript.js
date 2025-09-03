/* TODO:
 * Make it so that only one of a certain type of window can be open at one time or limit the # of them
 *  - maybe it could be okay if some of them could be opened infinite #s, but some of them should just bring the already open window to the top
 *  - could move blog window to be a window with links that could be clicked on to show that specific entry with a back button
 * 
 * Move all code to generate eventListeners for buttons into a seperate method. im adding them like. every time i change the state of a window
 *      8/29/25 12:16PM - WHY DO THE BUTTONS STAY ACTIVE AFTER BEING UNMINIMIZED IM GONNA BLOW UP MY COMPUTER
 *      8/29/25 12:31PM - [link to wolf shirt thing]
 * 
 * Add fullscreen functionality
 * 
 */
document.addEventListener("DOMContentLoaded", function() {
    console.log("Sorry this code is a mess. I've been too busy trying to implement this thing that I forgot to be organized")
    
    let zCount = 10;

    /*
    function init() {
        let activeButton = document.querySelectorAll('.btn');
        activeButton.forEach(function(e) {
            e.addEventListener('mousedown', function() {
                e.classList.add('btnActive');
            });
            e.addEventListener('mouseup', function() {
                e.classList.remove('btnActive');
            })
        });
    }
/*
    document.querySelectorAll('.drag').forEach(elem => {
        const header = elem.querySelector('.dragHeader') || elem;
        header.addEventListener('mousedown', function(e) {
            e.preventDefault();

            zCount++;
            elem.style.zIndex = zCount;

            let startX = e.clientX, startY = e.clientY;
            let origX = elem.offsetLeft, origY = elem.offsetTop;

            //log id (undefined if not set)
            //gets id of outer div, not header div
            //console.log("Dragging element id:", elem.id);

            //scale up while dragging
            //elem.style.transition = "transform 0.2s";
            //elem.style.transform = "scale(1.1)";
            elem.classList.add('currDrag');

            function onMove(ev) {
                //registers movement (i.e. if elem.style.left commented out item can only move vertically)
                elem.style.left = (origX + ev.clientX - startX) + "px";
                elem.style.top = (origY + ev.clientY - startY) + "px";
            }

            function onUp() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                //elem.style.transform = ""; // Reset scale
                elem.classList.remove('currDrag');
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });

        elem.addEventListener('mousedown', function(e) {
            if(!header.contains(e.target)) {
                zCount++;
                elem.style.zIndex = zCount;
            }
        })
    });*/

    function createWindow(id) {
        let data = windowData[id];
        if (!data) return; //why not do if data == null??

        const window = document.createElement('div');
        window.className = 'drag';
        window.id = id;

        //potentially change these based on where i put my icons
        window.style.top = '20vh';
        window.style.left = '40vw'

        zCount++;
        window.style.zIndex = zCount;

        window.innerHTML = `
            <div class="dragHeader" id=${id}Header">
              <div class="buttons">
                <button class="btn minim">&#x1F5D5;</button>
                <button class="btn">&#128470;</button>
                <button class="btn closeBtn">&#x00d7;</button>
              </div>
            <br>
            </div>
            <h3>${data.title}</h3>
            ${data.content}`;

            mw = window.querySelector('.minim')
            
            addButtonEvents(mw);

            window.querySelector('.minim').onclick = () => minimizeWindow(id, window);
            window.querySelector('.closeBtn').onclick = function () {
                //window is removed before class can be added - fix later
                window.querySelector('.closeBtn').classList.add('btnActive')
                window.remove();
            }
            document.getElementById('mainScreen').appendChild(window);
            makeDraggable(window);
    }

    function makeDraggable(elem) {
        const header = elem.querySelector('.dragHeader') || elem;
        header.addEventListener('mousedown', function(e) {
            e.preventDefault();

            zCount++;
            elem.style.zIndex = zCount;

            let startX = e.clientX, startY = e.clientY;
            let origX = elem.offsetLeft, origY = elem.offsetTop;

            //log id (undefined if not set)
            //gets id of outer div, not header div
            //console.log("Dragging element id:", elem.id);

            //scale up while dragging
            //elem.style.transition = "transform 0.2s";
            //elem.style.transform = "scale(1.1)";
            elem.classList.add('currDrag');

            function onMove(ev) {
                //registers movement (i.e. if elem.style.left commented out item can only move vertically)
                elem.style.left = (origX + ev.clientX - startX) + "px";
                elem.style.top = (origY + ev.clientY - startY) + "px";
            }

            function onUp() {
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                //elem.style.transform = ""; // Reset scale
                elem.classList.remove('currDrag');
            }

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });

        elem.addEventListener('mousedown', function(e) {
            if(!header.contains(e.target)) {
                zCount++;
                elem.style.zIndex = zCount;
            }
        });
    };

    document.getElementById('blog').addEventListener('click', function() {
        createWindow('blog');
    })

    const windowData = {
        prod: {
            title: `"Real men test in production"`,
            content: `<p>
            This website is under (heavy) construction. Once the website is actually implemented, if you experience any issues or bugs feel free to shoot me an email at
            hello@maxwellbrown.dev</p>
            <p id="smaller"> (Also I don't have a credits section yet so I just wanted to say that I got this tesseract gif from <a id="tempCred"
            href="https://en.wikipedia.org/wiki/File:Tesseract.gif">Wikipedia</a>)</p>`
        },
        //someone remind me to change all these references to "blog" at some point thanks
        blog: {
            title: 'First Blog Post',
            content: `<p>
            My best "in class" coding experience was during the buffer overflow lab in Systems II. I enjoyed the lab as a whole, but my favorite part was the last part.
            It was one of those coding problems that was enough of a challenge to make it engaging but not so challenging that it maked me want to break my laptop.
            <br><br>
            My best "outside the class" experience was when I finished a desktop app as a personal project. I had to learn a lot of new libraries and frameworks, so it was very
            satisfying to see them all come together. It also really cemented my love for front-end development.
            </p>`
        }
    }

    function addButtonHTML(id) {
        return `
        <div class="dragHeader" id="${id}Header">
            <div class="buttons">
                <button class="btn minim">&#x1F5D5;</button>
                <button class="btn maxim">&#128470;</button>
                <button class="btn closeBtn">&#x00d7;</button>
            </div>
            <br>
        </div>`
    }

    /* create windows on startup + add events to start button(or any other buttons I want to have by default)*/
    function startUp() {
        id = 'prod';
        let data = windowData[id];
        if (!data) return; //why not do if data == null??

        const window = document.createElement('div');
        window.className = 'drag';
        window.id = id;

        //potentially change these based on where i put my icons
        window.style.top = '15vh';
        window.style.left = '30vw'

        /* will be on top by default so might not need this. unless i want multiple windows on startup??
        zCount++;
        window.style.zIndex = zCount;
        */

        let html = addButtonHTML(id);

        window.innerHTML = `
            ${html}
            <h3>${data.title}</h3>
            ${data.content}`;

            mw = window.querySelector('.minim')
            
            addButtonEvents(mw);

            window.querySelector('.minim').onclick = () => minimizeWindow(id, window);
            window.querySelector('.maxim').onclick = () => function() {
                /* TODO - maximize the window when the maxim button is clicked
                 *  - add a windowMaxed (or smth) class to apply proper styling to windows
                 *  - do this after setting up new structure for handling css
                 *  - might have to make a structure for handling un-minimizing windows while a window is maxed
                 */
            }
            window.querySelector('.closeBtn').onclick = () => window.remove();
            
            document.getElementById('mainScreen').appendChild(window);
            makeDraggable(window);
        
            let start = document.getElementById('start');
            start.addEventListener('mousedown', function() {
                start.classList.add('btnActive');
                console.log(`click \n ${start.classList}`);
                //did all this debugging just to have put a ; inside the quotes and not realize it
                // NVM THAT DIDN'T FIX IT I LOVE PROGRAMMING
                // my btnActive class only has css rules for buttons in the .buttons class
                // TODO: change buttons class to headerButtons or smth
                // TODO: fix the css rules for the btnActive class because apparently it is kinda fucked up
            });
            start.addEventListener('mouseup', function() {
                start.classList.remove('btnActive');
                console.log(`unclick \n ${start.classList}`);
            });
    }

    function minimizeWindow(id, window) {
        /*forgor a good way to call two functions on one click so im calling this here
        (i literally just do not want to look it up rn)
        (it is currently 11:49PM and it is entirely my fault)
        window.remove();
        nvm it doesnt work anymore
        */

        if (document.getElementById('minimBtn-' + id)) return;
        window.style.display = 'none';

        const mw = document.createElement('button');
        mw.className = 'mWindows';
        mw.id = 'minimBtn-' + id;

        mw.innerHTML = getWindowName(id); //id = prod.. etc etc

        addButtonEvents(mw);

        //i remembered how to call two functions it's been like 5 minutes.
        //TODO: change back that other method (8/28/25)
        mw.onclick = function() {
            window.style.display = 'block';
            window.querySelector('.minim').classList.remove('btnActive'); //try getting the minim button to remove the btnActive class
            mw.remove();
        }

        document.getElementById('minimWindows').appendChild(mw);
        
        //gotta re-add these event listeners because i <3 deleting the entire minimize button
        // im trying to move these to a seperate method but it causes the btnActive class to not be removed after un-minimizing a window
            //was still using old mw variable in the seperate method lol <- dumbass
        /*
        mw.addEventListener('mousedown', function() {
            mw.classList.add('btnActive');
        });
        mw.addEventListener('mouseup', function() {
            mw.classList.remove('btnActive;')
        });
        */
        

    }

    function addButtonEvents(item) {
        item.addEventListener('mousedown', function() {
            item.classList.add('btnActive');
        });
        item.addEventListener('mouseup', function() {
            item.classList.remove('btnActive;');
        });
    }

    startUp();
    //init();

    //there has to be a better way to do this but i am too tired to figure that out rn
    //this is basically just a way to fetch the name for the minimized version of a window.
    // tbh i don't know if it has any benifit
    function getWindowName(id) {
        switch (id) {
            case 'prod':
                return 'INTRO';
            case 'blog':
                return 'BLOG';
        }
    }
});
/*
document.addEventListener("DOMContentLoaded", function() {
    function initEvents() {
        //console.log('test');
        let dragElems = document.querySelectorAll('.drag');
        //console.log(dragElems);
        dragElems.forEach(e => {
            //console.log(e);
            //e.addEventListener('mousedown', dragMouseDown(e));
            dragElement(e);
        })
    }

    function dragElement(elem) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let header = elem.querySelector('.dragHeader');
        if (header) {
            //console.log(header);
            header.addEventListener('onmousedown', dragMouseDown(elem))
        }

        function dragMouseDown(elem) {
            //console.log(elem);
            //elem = elem || window.event;
            //elem.preventDefault();
            //mouse position on startup
            pos3 = elem.clientX;
            pos4 = elem.clientY;
            console.log(pos3);
        }
    }
    initEvents();
*/

/* Old code
    let draggables = document.getElementsByClassName("drag");
    for (let i = 0; i < draggables.length; i++) {
        dragElement(draggables[i]);
    }

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let header = elmnt.querySelector(".dragHeader");
        if (header) {
            header.onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            //get mouse cursor pos on start
            pos3 = e.clientX;
            pos4 = e.clientY;
            console.log(e.id);
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            //calculate new cursor pos
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            //set element new pos
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            //stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
*/
//    });

/*
    - put event listener on all items with the drag/dragHeader class name
    - on mousedown get the elements id
*/