
import { FilterTable } from "components"
import { useMemo, useState } from "react"
import useCareers from "./useInstitutions"
import InsititutionForm from "./Form"

function InstitutionManagement(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {
        institutions,
        isLoading,
        formData,
        setFormData,
        GET_ALL_INSTITUTIONS,
        GET_INSTITUTION_DATA,
        CREATE_INSTITUTION,
        DELETE_INSTITUTION,
        UPDATE_INSTITUTION,
    } = useCareers()

    console.log(institutions)

    const filterComponent = useMemo(() => {
        return <FilterTable
            onClickAddBtn={()=>{
                setIsModalOpen(true)
            }}
            columns={[
                { name: 'name', displayName: 'Institución'},
                { name: "campuses", displayName: "Planteles"},
                { name: "city", displayName: "Ciudad"},
                { name: "state", displayName: "Estado"},
            ]
            }
            rows={institutions}
            isLoadingRows={isLoading}
            onChangeFilter={async (value) => {
               await GET_ALL_INSTITUTIONS(value)
            } }
            rowButtons={[{ icon: 'trash', onClick: async row => {
                await DELETE_INSTITUTION(row.id)
            } }]}
            columnsTemplate='4fr 2fr 2fr 1fr'
            onClickRow={async row => {
                setIsModalOpen(true)
                await GET_INSTITUTION_DATA(row.id)
            }}
        />
    }, [GET_ALL_INSTITUTIONS, institutions, isLoading])
    
    return <>
        {filterComponent}
        {isModalOpen && <InsititutionForm {...{ 
            formData,
            setFormData, 
            setIsModalOpen,
            CREATE_INSTITUTION,
            UPDATE_INSTITUTION,
        }} />}
    </>
}

export default InstitutionManagement