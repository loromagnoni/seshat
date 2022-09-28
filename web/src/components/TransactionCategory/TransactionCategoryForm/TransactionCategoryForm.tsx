import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditTransactionCategoryById, UpdateTransactionCategoryInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'



const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}


type FormTransactionCategory = NonNullable<EditTransactionCategoryById['transactionCategory']>

interface TransactionCategoryFormProps {
  transactionCategory?: EditTransactionCategoryById['transactionCategory']
  onSave: (data: UpdateTransactionCategoryInput, id?: FormTransactionCategory['id']) => void
  error: RWGqlError
  loading: boolean
}

const TransactionCategoryForm = (props: TransactionCategoryFormProps) => {
  const onSubmit = (data: FormTransactionCategory) => {
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.transactionCategory?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTransactionCategory> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
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
  )
}

export default TransactionCategoryForm
