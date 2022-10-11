import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import type { EditTransactionById, UpdateTransactionInput } from 'types/graphql'

import { RWGqlError, SelectField } from '@redwoodjs/forms'
import {
  DatetimeLocalField,
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextField,
} from '@redwoodjs/forms'

import TransactionCategoriesDropdownCell from 'src/components/TransactionCategory/TransactionCategoriesDropdownCell'

import { DeleteTransactionButton } from '../DeleteTransaction/DeleteTransactionButton'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormTransaction = NonNullable<EditTransactionById['transaction']>

interface TransactionFormProps {
  transaction?: EditTransactionById['transaction']
  onSave: (data: UpdateTransactionInput, id?: FormTransaction['id']) => void
  error: RWGqlError
  loading: boolean
  title: string
}

const TransactionForm = (props: TransactionFormProps) => {
  const onSubmit = (data: FormTransaction) => {
    props.onSave(data, props?.transaction?.id)
  }

  return (
    <Box
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      borderWidth={1}
      borderRadius={8}
      p={4}
      py={6}
    >
      <div className="rw-form-wrapper">
        <Form<FormTransaction> onSubmit={onSubmit} error={props.error}>
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
            {props.transaction && (
              <DeleteTransactionButton id={props.transaction.id} />
            )}
          </HStack>

          <Label
            name="transactionDate"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Transaction date
          </Label>

          <DatetimeLocalField
            name="transactionDate"
            defaultValue={formatDatetime(props.transaction?.deletedAt)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <FieldError name="deletedAt" className="rw-field-error" />

          <Label
            name="type"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Type
          </Label>

          <TextField
            name="type"
            defaultValue={props.transaction?.type}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="type" className="rw-field-error" />

          <Label
            name="amount"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Amount
          </Label>

          <TextField
            name="amount"
            defaultValue={props.transaction?.amount}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsNumber: true, required: true }}
          />

          <FieldError name="amount" className="rw-field-error" />

          <Label
            name="description"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Description
          </Label>

          <TextField
            name="description"
            defaultValue={props.transaction?.description}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="description" className="rw-field-error" />

          <Label
            name="transactionCategoryId"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Category
          </Label>
          <SelectField
            name="transactionCategoryId"
            defaultValue={props.transaction?.transactionCategoryId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true, valueAsNumber: true }}
          >
            <TransactionCategoriesDropdownCell />
          </SelectField>

          <FieldError name="transactionCategoryId" className="rw-field-error" />

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
    </Box>
  )
}

export default TransactionForm
