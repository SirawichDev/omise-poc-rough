import Omise from '@/lib/omise'
import OmiseCard from '@/lib/omiseCard'

declare global {
	interface Window {
		/**
		 * You can use the following methods on `Omise` to create a one-time-use token or source.
		 * 
		 * @see https://www.omise.co/omise-js#omise-methods
		 */
		 Omise: Omise
		/**
		 * You can use the following methods on `OmiseCard` to customize the appearance and behavior of your form.
		 * 
		 * @see https://www.omise.co/omise-js#omisecard-methods
		 */
		 OmiseCard: OmiseCard
	}
	const Omise: Omise
	const OmiseCard: OmiseCard
}

export { Omise, OmiseCard }