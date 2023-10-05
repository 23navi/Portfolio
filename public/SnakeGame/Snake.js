class Snake {
    constructor() {
        this.x = floor(blocksX / 2);
        this.y = floor(blocksY / 2);
        this.tailBlocks = [];
        this.tailBlocks.push(createVector(this.x - 3, this.y));
        this.tailBlocks.push(createVector(this.x - 2, this.y));
        this.tailBlocks.push(createVector(this.x - 1, this.y));
        this.velX = 1;
        this.velY = 0;
        this.apple = new Apple(this);
        this.addCount = 0;
        this.dead = false;


        // A* stuff
        this.survivalMode = false;
        this.path;
        this.controlledByPlayer = false;
        this.searchForLongestPathModeActive = false;
        this.noMoreAStar = false;
        this.lateGame = false;
        this.weWin = false;

    }


    resetOnHamiltonian(cycle) {
        this.cycle = cycle;
        this.tailBlocks = [];
        this.tailBlocks.push(createVector(cycle[0].x, cycle[0].y));
        this.tailBlocks.push(createVector(cycle[1].x, cycle[1].y));
        this.tailBlocks.push(createVector(cycle[2].x, cycle[2].y));
        this.x = cycle[3].x;
        this.y = cycle[3].y;
        this.apple = new Apple(this);
        this.headCyclePosition = 3;
        this.tailCyclePosition = 0;

    }


    show() {
        noStroke();

        fill(0,255, 0,255);

        noStroke();
        rect(this.x * blockSize + outlineLength, this.y * blockSize + outlineLength, blockSize - outlineLength * 2, blockSize - outlineLength * 2);

        rect((this.x + this.tailBlocks[this.tailBlocks.length - 1].x) * blockSize / 2.0 + outlineLength, (this.y + this.tailBlocks[this.tailBlocks.length - 1].y) * blockSize / 2.0 + outlineLength, blockSize - outlineLength * 2, blockSize - outlineLength * 2);
        for (var i = 0; i < this.tailBlocks.length; i++) {
            rect(this.tailBlocks[i].x * blockSize + outlineLength, this.tailBlocks[i].y * blockSize + outlineLength, blockSize - outlineLength * 2, blockSize - outlineLength * 2);
            if (i < this.tailBlocks.length - 1) {
                let x = (this.tailBlocks[i].x + this.tailBlocks[i + 1].x) / 2 * blockSize;
                let y = (this.tailBlocks[i].y + this.tailBlocks[i + 1].y) / 2 * blockSize;
                rect(x + outlineLength, y + outlineLength, blockSize - outlineLength * 2, blockSize - outlineLength * 2);
            }
        }

        if (!this.weWin) {
            this.apple.show();
        }


    }


    move() {
        if (this.weWin)
            return;
        if (!this.controlledByPlayer) {
            if (!this.path || this.path.pathCounter >= this.path.pathLength) {
                this.calculatePath();

            }

            if (!this.path || this.path.pathLength === 0) {
                let nextPos = this.getNextPosition();
                this.velX = nextPos.x - this.x;
                this.velY = nextPos.y - this.y;
            }else{
                let nextMove = this.path.getNextMove();
                this.velX = nextMove.x;
                this.velY = nextMove.y;
            }

        }
    


        if (this.addCount <= 0) {
            this.tailBlocks.splice(0, 1);
            this.tailCyclePosition = (this.tailCyclePosition + 1) % this.cycle.length;

        } else {
            this.addCount--;

        }
        this.tailBlocks.push(createVector(this.x, this.y));
        this.x += this.velX;
        this.y += this.velY;
    }

    getNextPosition() {
        this.appleCyclePosition = hc.getNodeNo(this.apple.x, this.apple.y);

        let possibleNextPositions = hc.getPossiblePositionsFrom(this.x, this.y);

        let minDiist = 100000;
        let minIndex = 0;
        for (let i = 0; i < possibleNextPositions.length; i++) {

            let distance = this.appleCyclePosition - possibleNextPositions[i];
            while (distance < 0) {
                distance += this.cycle.length;
            }

            if (this.overTakesTail(this.cycle[possibleNextPositions[i]])) {
                continue;
            }

            if (distance < minDiist) {
                minDiist = distance;
                minIndex = i;
            }

        }
        if (minDiist === 100000) {
            print("AHHHHHHHHHHH");
            
            return this.cycle[(hc.getNodeNo(this.x, this.y) + 1) % this.cycle.length];
        }

        return this.cycle[possibleNextPositions[minIndex]];


    }


    overTakesTail(newPos, h, t) {
        let minDistanceBetweenHeadAndTail = 50;
        let head;
        if (h) {
            head = h.cycleNo;
        } else {
            // print("oof");
            head = hc.getNodeNo(this.x, this.y);
        }

        let actualTail;
        if(t){
            actualTail = hc.getNodeNo(t.x,t.y);

        }else {
            // print("oof");
            actualTail = hc.getNodeNo(this.tailBlocks[0].x, this.tailBlocks[0].y);
        }
        if (this.getDistanceBetweenPoints(head, actualTail) <= minDistanceBetweenHeadAndTail + this.addCount) {
            return true;
        }

        let tail = actualTail - minDistanceBetweenHeadAndTail - this.addCount;
        if (tail < 0) {
            tail += this.cycle.length;
        }

        let temp = head;
        let nextPosNo = newPos.cycleNo;
        if (this.getDistanceBetweenPoints(head, newPos.cycleNo) >= this.getDistanceBetweenPoints(head, (tail))) {
          
            return true;
        }

        return false;
    }

    getPathBasedOnAStar() {
        for(let n of this.cycle){
            n.resetForAStar();
        }
        this.appleCyclePosition = hc.getNodeNo(this.apple.x, this.apple.y);

        let startNode = this.cycle[hc.getNodeNo(this.x, this.y)];
        let bigList = [];

        let winningPath;

        let startingPath = new HPath(startNode,this.cycle[this.appleCyclePosition]);

        bigList.push(startingPath);


        while (true) {
            // print(bigList.length);
            if (bigList.length === 0) {
                // // (!winningPath) ? print("No Path found") : winningPath.print();
                return winningPath;
            }
            let currentPath = bigList.shift();
            if (winningPath && currentPath.pathLength >= winningPath.pathLength) {
                continue;
            }

            if (currentPath.distanceToApple === 0) {//path has found apple

                if (winningPath == null || currentPath.pathLength < winningPath.pathLength) {
                    winningPath = currentPath.clone();
                }
                continue;
            }


            //if the final node has been visited and the previous visit was a shorter path then fuck this path
            let finalNodeInPath = currentPath.getLastNode();

            if (!finalNodeInPath.alreadyVisited || currentPath.pathLength < finalNodeInPath.shortestDistanceToThisPoint) {

                //this is the shortest found path to this point
                finalNodeInPath.alreadyVisited = true;
                finalNodeInPath.shortestDistanceToThisPoint = currentPath.pathLength;

                //now we need to add all the paths possible from this node to the bigList

                for (var n of finalNodeInPath.edges) {

                    if (this.overTakesTail(n, finalNodeInPath, currentPath.getSnakeTailPositionAfterFollowingPath(this))) {
                        if (n.cycleNo !== finalNodeInPath.cycleNo + 1) {
                            continue;
                        }
                    }

                    let p = currentPath.clone();
                    p.addToTail(n);
                    if (p.getLastNode().alreadyVisited && p.pathLength > p.getLastNode().shortestDistanceToThisPoint) {
                        continue;
                    }
                    bigList.push(p);
                }
            }

            //now we need to sort the bigList based on the distances to the apple plus the current distance of the path
            bigList.sort((a, b) => ((a.distanceToApple + a.pathLength) - (b.distanceToApple + b.pathLength)));

        }
    }

    getDistanceBetweenPoints(from, to) {

        let distance = to - from;
        while (distance < 0) {
            distance += this.cycle.length;
        }
        return distance;
    }

    checkFuturePos() {
        this.x += this.velX;
        this.y += this.velY;
        for (var i = 0; i < this.tailBlocks.length; i++) {
            if (this.tailBlocks[i].x === this.x && this.tailBlocks[i].y === this.y) {
                this.dead = true;
            }
        }

        if (this.x < 0 || this.x >= blocksX || this.y < 0 || this.y >= blocksY) {
            this.dead = true;
        }

        this.x -= this.velX;
        this.y -= this.velY;

        if (this.dead) {
            this.dead = false;
            pause = true;
        }

    }

    update() {
        if(!this.dead){
            this.move();
            this.checkCollisions();
        }

    }

    checkCollisions() {

        if (blocksX * blocksY - (this.tailBlocks.length + 1) <= 0) {
            this.weWin = true;
            setup();
            return;
        }

        for (var i = 0; i < this.tailBlocks.length; i++) {
            if (this.tailBlocks[i].x === this.x && this.tailBlocks[i].y === this.y) {
                this.dead = true;
                return;
            }
        }

        if (this.x < 0 || this.x >= blocksX || this.y < 0 || this.y >= blocksY) {
            this.dead = true;
            return;
        }

        if (this.x === this.apple.x && this.y === this.apple.y) {
            this.ateApple();
        }


    }


    ateApple() {


        this.addCount += 4;


        this.apple = new Apple(this);

        this.calculatePath();


    }


    calculatePath() {

        this.path = this.getPathBasedOnAStar();
      

    }

    isAppleOnSnake(a) {
        return this.snakeAtPosition(a.x, a.y);
    }

    snakeAtPosition(x, y) {
        return this.snakeTailAtPosition(x, y) || (this.x == x && this.y == y);
    }

    snakeTailAtPosition(x, y) {
        for (var i = 0; i < this.tailBlocks.length; i++) {
            if (this.tailBlocks[i].x == x && this.tailBlocks[i].y == y) {
                return true;
            }
        }
        return false;
    }
}


