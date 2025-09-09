"use client";

import Container from "@/components/ui/Container";
import ReviewCard from "./ReviewCard";
import { Review } from "@/types/reviews";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <section className="pb-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ReviewList;
