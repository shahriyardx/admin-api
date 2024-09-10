import { api } from "@/utils/api"

const useSettings = () => {
	const { data } = api.settings.settings.useQuery()
	return data
}

export default useSettings
