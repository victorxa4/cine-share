import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button } from 'presentation/components/Button';
import { FormGroup } from 'presentation/components/Form/Group';
import { Input } from 'presentation/components/Form/Input';
import { Textarea } from 'presentation/components/Form/textarea';
import { Overlay } from 'presentation/components/Overlay';
import { Portal } from 'presentation/components/Portal';
import { Title } from 'presentation/components/Typography/Title';
import { SchemaCreateCollection, validationSchemaCreateCollection } from 'presentation/validations/collection/create';

import { createCollection } from 'infra/services/collection/createCollection';

import { CollectionModalCreateProps } from 'types/presentation/collection';

import { useDetectClickOutside } from 'react-detect-click-outside';
import { ModalContainerCollection } from '../styles/ModalContainer';
import { Form } from './styles';

export function CollectionModalCreate({ onClose, visible }: CollectionModalCreateProps) {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    reset,
  } = useForm<SchemaCreateCollection>({
    resolver: zodResolver(validationSchemaCreateCollection),
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);
  const elementRef = useDetectClickOutside({ onTriggered: onClose });

  async function handleCreateCollection(data: SchemaCreateCollection) {
    try {
      setLoading(true);
      await createCollection(data);

      toast.success('Coleção foi criada');
      reset();
      onClose();
    } catch {
      toast.success('Não está autenticado, faça login na plataforma');
    } finally {
      setLoading(false);
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <Portal selector="create-collection-modal">
      <Overlay>
        <ModalContainerCollection ref={elementRef}>
          <div className="header">
            <Title as="strong" size="medium">Criar coleção</Title>
            <button type="button" onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="content">
            <Form onSubmit={handleSubmit(handleCreateCollection)}>
              <FormGroup errorMessage={errors?.name?.message}>
                <Input placeholder="Nome" {...register('name')} />
              </FormGroup>

              <FormGroup errorMessage={errors?.description?.message}>
                <Textarea placeholder="Descrição (opcional)" {...register('description')} />
              </FormGroup>

              <div className="actions">
                <Button type="submit" disabled={!isValid} loading={loading}>
                  Criar Coleção
                </Button>

                <Button type="reset" outline schemaColor="softGray" onClick={onClose}>
                  Cancelar
                </Button>
              </div>
            </Form>
          </div>
        </ModalContainerCollection>
      </Overlay>
    </Portal>
  );
}
