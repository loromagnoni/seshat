import { HStack, Text } from '@chakra-ui/react'
import type {
  EditTransactionCategoryById,
  UpdateTransactionCategoryInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  DatetimeLocalField,
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextField,
} from '@redwoodjs/forms'

import { Card } from 'src/components/ui/Card'

import { DeleteTransactionCategoryButton } from '../DeleteCategory/DeleteTransactionCategoryButton'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormTransactionCategory = NonNullable<
  EditTransactionCategoryById['transactionCategory']
>

interface TransactionCategoryFormProps {
  transactionCategory?: EditTransactionCategoryById['transactionCategory']
  onSave: (
    data: UpdateTransactionCategoryInput,
    id?: FormTransactionCategory['id']
  ) => void
  error: RWGqlError
  loading: boolean
  title: string
}

const TransactionCategoryForm = (props: TransactionCategoryFormProps) => {
  const onSubmit = (data: FormTransactionCategory) => {
    props.onSave(data, props?.transactionCategory?.id)
  }

  return (
    <Card variant="flat-border">
      <div className="rw-form-wrapper">
        <Form<FormTransactionCategory> onSubmit={onSubmit} error={props.error}>
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <HStack justifyContent={'space-between'}>
            <Text fontFamily={'monospace'} fontSize={21}>
              {props.title}
            </Text>
            {props.transactionCategory && (
              <DeleteTransactionCategoryButton
                name={props.transactionCategory.name}
                id={props.transactionCategory.id}
              />
            )}
          </HStack>

          <Label
            name="deletedAt"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Deleted at
          </Label>

          <DatetimeLocalField
            name="deletedAt"
            defaultValue={formatDatetime(props.transactionCategory?.deletedAt)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <FieldError name="deletedAt" className="rw-field-error" />

          <Label
            name="name"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Name
          </Label>

          <TextField
            name="name"
            defaultValue={props.transactionCategory?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="name" className="rw-field-error" />

          <Label
            name="icon"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Icon
          </Label>

          <TextField
            name="icon"
            defaultValue={props.transactionCategory?.icon}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="icon" className="rw-field-error" />

          <div className="rw-button-group">
            <Submit
              disabled={props.loading}
              className="rw-button rw-button-blue"
            >
              Save
            </Submit>
          </div>
        </Form>
      </div>
    </Card>
  )
}

export default TransactionCategoryForm
