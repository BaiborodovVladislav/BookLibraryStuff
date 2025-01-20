import React from 'react'

const variantStyles: Record<BookCoverVariant, string> = {
	extraSmall: 'book-cover_extra_small',
	small: 'book-cover_small',
	medium: 'book-cover_medium',
	regular: 'book-cover_regular',
	wide: 'book-cover_wide',
}

interface Props{
	className?: string;
	variant: 'wide' | 'small';
	coverColor: string;
	coverUrl: string;
}

const BookCover = ({
	className, variant, coverColor, coverUrl,
}: Props) => {
  return (
    <div>BookCover</div>
  )
}

export default BookCover