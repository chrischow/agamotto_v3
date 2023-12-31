import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Tag,
  useEditableControls,
} from '@chakra-ui/react'

const EditableHeading = ({
  headingText,
  handleChange,
  submitChange,
}: {
  headingText: string
  handleChange: (newValue: string) => void
  submitChange: () => void
}) => {
  const EditableControls = () => {
    const { isEditing, getEditButtonProps } = useEditableControls()
    return isEditing ? undefined : (
      <Tag fontSize="small" {...getEditButtonProps()}>
        Click to edit
      </Tag>
    )
  }

  return (
    <Editable
      width="100%"
      mt={2}
      value={headingText}
      onChange={handleChange}
      fontSize="2.25rem"
      fontFamily="brand"
      fontWeight="700"
      onBlur={submitChange}
    >
      <HStack alignItems="center">
        <EditablePreview />
        <EditableInput fontSize="2.25rem" fontFamily="brand" fontWeight="700" />

        <EditableControls />
      </HStack>
    </Editable>
  )
}

export default EditableHeading
