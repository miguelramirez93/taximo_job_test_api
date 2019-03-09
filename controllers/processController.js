
function putInBag(fishInShop, currentCat, otherCat) {
    for (let i = 0; i < fishInShop.length; i++) {
        const fish = fishInShop[i];
        if (!inBag(fish, currentCat) && !inBag(fish, otherCat)) {
            currentCat.bag.push(fish)
        }

    }
}
function inBag(fish, cat) {
    for (let i = 0; i < cat.bag.length; i++) {
        const fishInBag = cat.bag[i];
        if (fish === fishInBag) {
            return true
        }
    }
    return false
}


async function grafWalktrougth(currentCat, otherCat, shopsFishInfo, shopsConnInfo) {

    let currentShopFishInfo = shopsFishInfo[currentCat.currentShop]

    putInBag(currentShopFishInfo[1].split(' '), currentCat, otherCat)
    let currentMinCat = {
        bag: [],
        timeSpend: -1,
        currentShop: 0,
    }
    for (let i = 0; i < shopsConnInfo.length; i++) {
        let connInfo = shopsConnInfo[i]
        if (connInfo[0] === (currentCat.currentShop + 1)) {

            let auxCurrentCat = Object.create(currentCat)
            let auxOtherCat = Object.create(otherCat)
            auxCurrentCat.bag = currentCat.bag.slice()
            auxOtherCat.bag = otherCat.bag.slice()

            auxCurrentCat.currentShop = (connInfo[1] - 1)
            auxCurrentCat.timeSpend += connInfo[2]

            res = await grafWalktrougth(auxCurrentCat, auxOtherCat, shopsFishInfo, shopsConnInfo)

            //currentMinCat.timeSpend > res.timeSpend
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
        //Start in the shop n=1

        bcWalk = await grafWalktrougth(bc, lc, shopsFishInfo, shopsConnInfo)
        if (bcWalk.bag.length === numTypes) {
            lcWalk = bcWalk
        } else {
            lcWalk = await grafWalktrougth(lc, bcWalk, shopsFishInfo, shopsConnInfo)

        }
        let minTime = 0
        if(bcWalk.timeSpend >= lcWalk.timeSpend){
            minTime = bcWalk.timeSpend
        }else{
            minTime = lcWalk.timeSpend
        }

        return { bc: bcWalk, lc: lcWalk, minTime: minTime }
    }
}