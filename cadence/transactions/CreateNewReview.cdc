// Create new Review

import Flowtastic from 0xFLOWTASTIC

// mutation example with dictionary
// const metadata = [
//   { key: "rating", value: "4" },
//   { key: "title", value: "title" },
//   { key: "description", value: "description" },
//   { key: "editionID", value: "123" },
// ]

// const transactionId = await fcl.mutate({
//   cadence: CreateNewReview,
//   args: (arg, t) => [
//     arg(metadata, t.Dictionary({ key: t.String, value: t.String })),
//   ],
// })

transaction (metadata: {String: String}) {
    prepare(acct: AuthAccount) {
        if acct.borrow<&Flowtastic.Collection>(from: Flowtastic.ReviewCollectionStoragePath) != nil {
            log("Collection exists!")
        } else {
            acct.save<@Flowtastic.Collection>(<-Flowtastic.createEmptyCollection(), to: Flowtastic.ReviewCollectionStoragePath)
            acct.link<&{Flowtastic.CollectionPublic}>(Flowtastic.ReviewCollectionPublicPath, target: Flowtastic.ReviewCollectionStoragePath)
        }

        let collection = acct.borrow<&Flowtastic.Collection>(from: Flowtastic.ReviewCollectionStoragePath)

        collection?.saveReview(review: <-Flowtastic.createReview(metadata: metadata))
        log("Review created successfully, with message ")
    }
}
 