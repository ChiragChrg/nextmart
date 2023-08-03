import { ChangeEvent, Dispatch, SetStateAction } from 'react'

type InfoBarType = {
    label: string,
    value: string | Date,
    placeholder?: string,
    isDate?: boolean
    editable?: boolean
    setPhoneValue?: Dispatch<SetStateAction<string | null>>
    setDobValue?: Dispatch<SetStateAction<Date | null>>
}

const InfoBar = ({ label, value, placeholder, isDate = false, editable = false, setPhoneValue, setDobValue }: InfoBarType) => {
    const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDate) {
            const newDate = e?.currentTarget?.value;
            setDobValue && setDobValue(newDate ? new Date(newDate) : null)
        }
        else
            setPhoneValue && setPhoneValue(e?.currentTarget?.value)
    }

    let dateValue

    if (isDate) {
        const isoDateString = value;
        const dateObject = new Date(isoDateString);
        dateValue = dateObject.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    return (
        <div className="grid grid-cols-3 border border-secondaryClr px-2 py-1 rounded overflow-hidden">
            <span className="pr-4 border-r border-secondaryClr">{label}</span>

            {editable ?
                <input
                    type={isDate ? "date" : "text"}
                    className="w-full col-span-2 pl-4 outline-none"
                    defaultValue={value ? value as any : ""}
                    onChange={(e) => handleEdit(e)}
                    placeholder={!value ? placeholder : ""} />
                :
                <span className="pl-4 col-span-2">{isDate ? dateValue : value as any}</span>
            }
        </div>
    )
}

export default InfoBar