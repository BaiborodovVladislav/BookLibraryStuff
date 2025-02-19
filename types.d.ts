interface Book {
	id: number,
	title: string,
  author: string,
  genre: string,
  rating: number,
  total: string,
  total_copies: number,
  available_copies: number,
  description: string,
  color: string,
  cover: string,
  video: string,
  summary: string,
  isLoanedBook?: boolean,
  total?: string,
  isLoaned?: boolean,
}

interface AuthCredentials{
  fullname: string,
  email: string,
  password: string,
  universityId: number,
  universityCard: string,

}