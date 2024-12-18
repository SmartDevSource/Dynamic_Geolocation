import { atom } from "jotai"

export const alertAtom = atom({message: '', type: 'error', permanent: false})
export const showFullWrapperAtom = atom(false)