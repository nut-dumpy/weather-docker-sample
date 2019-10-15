import { useState, useEffect } from 'react'

// how to throttle hooks?
const useDebouncedValue = (newValue, time) => {
	const [savedData, setSavedData] = useState(newValue)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSavedData(newValue)
		}, time)


		return () => clearTimeout(timeout)
	}, [newValue, time])

	return savedData
}

export default useDebouncedValue
