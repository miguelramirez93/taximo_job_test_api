//Puts the fish in the currentCat bag if this or otherCat don't have it
function putInBag(fishInShop, currentCat, otherCat) {
    for (let i = 0; i < fishInShop.length; i++) {
        const fish = fishInShop[i];
        if (!inBag(fish, currentCat) && !inBag(fish, otherCat)) {
            currentCat.bag.push(fish)
        }

    }
}
//Return tru or false if the fish is in the bag of the cat
function inBag(fish, cat) {
    for (let i = 0; i < cat.bag.length; i++) {
        const fishInBag = cat.bag[i];
        if (fish === fishInBag) {
            return true
        }
    }
    return false
}


async function grafWalktrougt(currentCat, otherCat, shopsFishInfo, shopsConnInfo) {
    let currentShopFishInfo = shopsFishInfo[currentCat.currentShop]
    putInBag(currentShopFishInfo[1].split(' '), currentCat, otherCat)
    let currentMinCat = {//variable to carry on the min time spend by a cat
        bag: [],
        timeSpend: -1,
        currentShop: 0,
    }
    for (let i = 0; i < shopsConnInfo.length; i++) {
        let connInfo = shopsConnInfo[i]
        if (connInfo[0] === (currentCat.currentShop + 1)) {//loop for walk trougt the graff connections

            let auxCurrentCat = Object.create(currentCat)
            let auxOtherCat = Object.create(otherCat)
            auxCurrentCat.bag = currentCat.bag.slice()
            auxOtherCat.bag = otherCat.bag.slice()

            auxCurrentCat.currentShop = (connInfo[1] - 1)
            auxCurrentCat.timeSpend += connInfo[2]
            //recursive call for wlak trougt all the graff correctly
            res = await grafWalktrougt(auxCurrentCat, auxOtherCat, shopsFishInfo, shopsConnInfo)
            //conditions for the minTIme resolution
            if (currentMinCat.timeSpend === -1 || res.bag.length > currentMinCat.bag.length) {

                currentMinCat.timeSpend = res.timeSpend
                currentMinCat.bag = res.bag
                currentMinCat.currentShop = res.currentShop

            } else if (res.bag.length === currentMinCat.bag.length) {
                if (res.timeSpend < currentMinCat.timeSpend) {
                    currentMinCat.timeSpend = res.timeSpend
                    currentMinCat.bag = res.bag
                    currentMinCat.currentShop = res.currentShop
                }
            }
        }
    }

    if (currentMinCat.timeSpend !== -1) {
        return currentMinCat
    } else {
        return currentCat
    }

}


module.exports = {
    //Func for calculate the best time to get all fish types 
    async bestTravelTimeCalc(shopsFishInfo, shopsConnInfo, numTypes) {
        //Define cat's
        let bc = {//Big Cat
            bag: [],
            timeSpend: 0,
            currentShop: 0,
        }
        let lc = { //Little Cat 
            bag: [],
            timeSpend: 0,
            currentShop: 0,
        }

        let bcWalk = {}
        let lcWalk = {}

        //Start the process with bigCat trougt the graff  
        bcWalk = await grafWalktrougt(bc, lc, shopsFishInfo, shopsConnInfo)
        //If collect all possibles fish types don't start the process with littleCat 
        if (bcWalk.bag.length === numTypes) {
            lcWalk = bcWalk
        } else {
            //start the littleCat search for lose fishs
            lcWalk = await grafWalktrougt(lc, bcWalk, shopsFishInfo, shopsConnInfo)

        }
        let minTime = 0
        if (bcWalk.timeSpend >= lcWalk.timeSpend) {
            minTime = bcWalk.timeSpend
        } else {
            minTime = lcWalk.timeSpend
        }

        return { bc: bcWalk, lc: lcWalk, minTime: minTime }
    }
}