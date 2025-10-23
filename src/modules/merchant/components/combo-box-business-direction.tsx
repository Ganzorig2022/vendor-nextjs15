import { ComboBox } from '@/components/shared/combo-box'
import { IBusinessDirection } from '@/modules/general/types/type'

type BusinessComboBoxProps = {
  data: IBusinessDirection[]
  value?: string
  onChange: (newValue: string) => void
}

export const ComboBoxBusinessDirection = ({
  data,
  value,
  onChange,
}: BusinessComboBoxProps) => {
  return (
    <ComboBox<IBusinessDirection>
      labelKey="name"
      valueKey="id"
      data={data}
      selectedValue={value}
      placeholder="Бизнес чиглэл хайх..."
      emptyText="Бизнес чиглэл олдсонгүй."
      onSelect={(val) => onChange(val)}
    />
  )
}
