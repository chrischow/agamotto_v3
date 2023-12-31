import {
  Box,
  Editable,
  EditablePreview,
  EditableTextarea as ChakraEditableTextarea,
  HStack,
  Tag,
  useEditableControls,
} from '@chakra-ui/react'

const EditableTextArea = ({
  text,
  handleChange,
  submitChange,
}: {
  text: string
  handleChange: (newValue: string) => void
  submitChange: () => void
}) => {
  const EditableControls = () => {
    const { isEditing, getEditButtonProps } = useEditableControls()
    return (
      <Box mt={1}>
        {isEditing ? undefined : (
          <Tag fontSize="small" {...getEditButtonProps()}>
            Click above to edit
          </Tag>
        )}
      </Box>
    )
  }

  return (
    <Editable
      width="100%"
      mt={0}
      value={text}
      onChange={handleChange}
      fontSize="large"
      onBlur={submitChange}
    >
      <HStack width="100%" alignItems="center">
        <EditablePreview whiteSpace="pre-wrap" />
        <ChakraEditableTextarea
          as="textarea"
          width="100%"
          fontSize="large"
          border="none"
        />
      </HStack>
      <EditableControls />
    </Editable>
  )
}

export default EditableTextArea
