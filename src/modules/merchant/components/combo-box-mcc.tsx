import { ComboBox } from '@/components/shared/combo-box'
import { IMCC } from '@/modules/general/types/type'

type MCCComboBoxProps = {
  data: IMCC[]
  value?: string
  onChange: (newValue: string) => void
}

export const ComboBoxMCC = ({ data, value, onChange }: MCCComboBoxProps) => {
  return (
    <ComboBox<IMCC>
      labelKey="name_mon"
      valueKey="mcc_code"
      data={data}
      selectedValue={value}
      placeholder="MCC хайх..."
      emptyText="MCC олдсонгүй."
      onSelect={(val) => onChange(val)}
    />
  )
}
