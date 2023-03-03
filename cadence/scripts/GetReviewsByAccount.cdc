import Flowtastic from 0xFLOWTASTIC

pub struct ReviewMetadata {
    pub let id: UInt64
    pub let rating: String 
    pub let title: String 
    pub let description: String 
    pub let editionID: String 

    init(id: UInt64, rating: String, title: String, description: String, editionID: String) {
        self.id = id
        self.rating = rating
        self.title = title
        self.description = description
        self.editionID = editionID
    }
}

pub fun main(account: Address): [ReviewMetadata] {
    let reviewOwner = getAccount(account)

    let capability = reviewOwner.getCapability<&{Flowtastic.CollectionPublic}>(Flowtastic.ReviewCollectionPublicPath)

    let publicRef = capability.borrow()
            ?? panic("Could not borrow public reference")

    let reviewIDs = publicRef.getIDs()

    let reviews: [ReviewMetadata] = []

    for reviewID in reviewIDs {
        let review = publicRef.borrowReview(id: reviewID) ?? panic("this review does not exist")
        let metadata = ReviewMetadata(id: review.id, rating: review.metadata["rating"]!, title: review.metadata["title"]!, description: review.metadata["description"]!, editionID: review.metadata["editionID"]!)
        reviews.append(metadata)
    }

    return reviews
}
 