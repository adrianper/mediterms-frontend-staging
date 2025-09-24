
import { FilterTable } from "components"
import { useMemo, useState } from "react"
import useCareers from "./useCareers"
import CareerForm from "./_Careers/Form"

function CareerManagement(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {
        careers,
        topics,
        isLoading,
        formData,
        setFormData,
        GET_ALL_CAREERS,
        CREATE_CAREER, 
        UPDATE_CAREER,
        DELETE_CAREER
    } = useCareers()

    console.log(careers)

    const filterComponent = useMemo(() => {
        return <FilterTable
            onClickAddBtn={()=>{
                setIsModalOpen(true)
            }}
            columns={[
                { name: 'name', displayName: 'Carrera'},
            ]
            }
            rows={careers}
            isLoadingRows={isLoading}
            onChangeFilter={async (value) => {
               await GET_ALL_CAREERS(value)
            } }
            rowButtons={[{ icon: 'trash', onClick: row => DELETE_CAREER(row.id) }]}
            columnsTemplate='2fr auto'
            onClickRow={row => {
                setFormData(row)
                setIsModalOpen(true)
            }}
        />
    }, [GET_ALL_CAREERS, careers, isLoading])
    
    return <>
        {filterComponent}
        {isModalOpen && <CareerForm {...{ 
            CREATE_CAREER, 
            UPDATE_CAREER,
            topics, 
            formData,
            setFormData, 
            setIsModalOpen
        }} />}
    </>
}

export default CareerManagement