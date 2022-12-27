import EditorJs from '@editorjs/editorjs';
import EditorJsChecklist from '@editorjs/checklist';
import EditorJsDelimiter from '@editorjs/delimiter';
import EditorJsHeader from '@editorjs/header';
import EditorJsList from '@editorjs/list';
import EditorJsParagraph from '@editorjs/paragraph';
import EditorJsTable from '@editorjs/table';
import EditorJsQuote from '@editorjs/quote';
import { Box, Field, FieldError, FieldHint, FieldLabel, Flex, Stack } from '@strapi/design-system';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import './Input.css';
import { editorJsOutputDataToJson, getTrad, jsonToEditorJsOutputData } from '../utils';

/**
 * @template {({ target: { name: string, value: string } }) => any} OnChangeFn
 *
 * @param { Object } params
 * @param { string } params.contentTypeUID
 * @param { string } params.error
 * @param { string } params.intlLabel
 * @param { string } params.intlDescription
 * @param { string } params.labelAction
 * @param { string } params.name
 * @param { OnChangeFn } params.onChange - function to set the OutputData in the content manager
 * @param { boolean } params.required
 * @param { string } params.value - the editorjs OutputData as JSON string
 * @returns { JSX.Element }
 * @constructor
 */
const Input = ({ contentTypeUID, error, intlLabel, intlDescription, labelAction, name, onChange, required, value }) => {
  const { formatMessage } = useIntl();

  const [elementId] = useState(`editorjs-${contentTypeUID}-${name}`);
  const [editorJsOutputData, setEditorJsOutputData] = useState(jsonToEditorJsOutputData(value));
  const [editorJsInstance, setEditorJsInstance] = useState(undefined);

  useEffect(() => {
    setEditorJsOutputData(jsonToEditorJsOutputData(value));
  }, [value]);

  if (!editorJsInstance) {
    setEditorJsInstance(
      // https://editorjs.io/configuration
      new EditorJs({
        holder: elementId,
        minHeight: 32,
        inlineToolbar: true,
        data: editorJsOutputData,

        onChange: async (api) => {
          const outputData = await api.saver.save();
          setEditorJsOutputData(outputData);
          onChange({ target: { name, value: editorJsOutputDataToJson(outputData) } });
        },

        tools: {
          paragraph: {
            // https://github.com/editor-js/paragraph
            class: EditorJsParagraph,
            inlineToolbar: true,
            config: {
              placeholder: formatMessage({ id: getTrad('placeholder.paragraph') }),
            },
          },
          header: {
            // https://github.com/editor-js/header
            class: EditorJsHeader,
            inlineToolbar: true,
            config: {
              placeholder: formatMessage({ id: getTrad('placeholder.header') }),
              defaultLevel: 1,
            },
          },
          quote: {
            // https://github.com/editor-js/quote
            class: EditorJsQuote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: formatMessage({ id: getTrad('placeholder.quote') }),
              captionPlaceholder: formatMessage({ id: getTrad('placeholder.quoteCaption') }),
            },
          },
          table: {
            // https://github.com/editor-js/table
            class: EditorJsTable,
            inlineToolbar: true,
          },
          list: {
            // https://github.com/editor-js/list
            class: EditorJsList,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered',
            },
          },
          delimiter: {
            // https://github.com/editor-js/delimiter
            class: EditorJsDelimiter,
            inlineToolbar: true,
          },
          checklist: {
            // https://github.com/editor-js/checklist
            class: EditorJsChecklist,
            inlineToolbar: true,
          },
        },
      }),
    );
  }

  return (
    <Field
      name={name}
      id={name}
      // GenericInput calls formatMessage and returns a string for the error
      error={error}
      hint={intlDescription && formatMessage(intlDescription)}
    >
      <Stack spacing={1}>
        <Flex>
          <FieldLabel required={required}>{formatMessage(intlLabel)}</FieldLabel>
          {labelAction && <Box paddingLeft={1}>{labelAction}</Box>}
        </Flex>

        <Box
          id={elementId}
          className="editorjs-box"
          borderColor="neutral200"
          hasRadius={true}
          paddingLeft="16px"
          paddingRight="16px"
        />

        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

Input.propTypes = {
  contentTypeUID: PropTypes.string,
  error: PropTypes.string,
  intlLabel: PropTypes.string,
  intlDescription: PropTypes.string,
  labelAction: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default Input;
