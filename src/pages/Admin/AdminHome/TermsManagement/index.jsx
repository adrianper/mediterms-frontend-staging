
import { FilterTable } from "components"
import useTerms from "./useTerms"
import TermsForm from "./_TermsForm"
import { useMemo, useState } from "react"

function TermsManagement(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {
        terms,
        topics,
        isLoading,
        formData,
        setFormData,
        GET_ALL_TERMS,
        CREATE_TERM, 
        UPDATE_TERM,
        DELETE_TERM
    } = useTerms()


    const filterComponent = useMemo(() => {
        return <FilterTable
            onClickAddBtn={()=>{
                setIsModalOpen(true)
            }}
            columns={[
                { name: 'term', displayName: 'Termino'},
                { name: 'topicName', displayName: 'Tema' },
                { name: 'definition', displayName: 'Definición' },
            ]
            }
            rows={terms}
            isLoadingRows={isLoading}
            onChangeFilter={async (value) => {
               console.log("--------------",value)

               await GET_ALL_TERMS(value)
            } }
            rowButtons={[{ icon: 'trash', onClick: row => DELETE_TERM(row.id) }]}
            columnsTemplate='2fr 3fr 1fr'
            onClickRow={row => {
                setFormData(row)
                setIsModalOpen(true)
            }}
        />
    }, [GET_ALL_TERMS, terms, isLoading])
    
    return <>
        {filterComponent}
        {isModalOpen && <TermsForm {...{ 
            CREATE_TERM, 
            UPDATE_TERM,
            topics, 
            formData,
            setFormData, 
            setIsModalOpen
        }} />}
    </>
}

export default TermsManagement