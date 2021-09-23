package engine

import (
	"sngrpc/sngpoker"
)

type Dealer interface {
	DealHand(n int) []*sngpoker.Card
}
