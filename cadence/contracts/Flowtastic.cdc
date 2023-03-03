// Credits: Adapted from Twitter3 Example
pub contract Flowtastic {

    pub let ReviewCollectionStoragePath: StoragePath
    pub let ReviewCollectionPublicPath: PublicPath

    pub resource Review {
        pub let id: UInt64

        pub var metadata: {String: String}

        init(metadata: {String: String}) {
            self.id = self.uuid
            self.metadata = metadata
        }
    }

    pub fun createReview(metadata: {String: String}): @Review {
        return <-create Review(metadata: metadata)
    }

    pub resource interface CollectionPublic {
        pub fun getIDs(): [UInt64]
        pub fun borrowReview(id: UInt64): &Review? 
    }

    pub resource Collection: CollectionPublic {
        pub var reviews: @{UInt64: Review}

        pub fun saveReview(review: @Review) {
            self.reviews[review.id] <-! review
        }

        pub fun getIDs(): [UInt64] {
            return self.reviews.keys
        }

        pub fun borrowReview(id: UInt64): &Review? {
            if self.reviews[id] != nil {
                let ref = (&self.reviews[id] as &Flowtastic.Review?)!
                return ref
            }
            return nil
        }

        init() {
            self.reviews <- {}
        }

        destroy() {
            destroy self.reviews
        }
    }

    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    init() {
        self.ReviewCollectionStoragePath = /storage/ReviewCollection
        self.ReviewCollectionPublicPath = /public/ReviewCollection
        self.account.save(<-self.createEmptyCollection(), to: self.ReviewCollectionStoragePath)
        self.account.link<&{CollectionPublic}>(self.ReviewCollectionPublicPath, target: self.ReviewCollectionStoragePath)
    }
}
