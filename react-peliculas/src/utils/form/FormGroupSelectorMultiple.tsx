import '../../styles/utils/form/FormGroupSelectorMultiple.css'
export const FormGroupSelectorMultiple = (props: formGroupSelectorMultipleProps) => {
 
    
    const seleccionar = (item :SelectorMultipleModel)=> {
         const seleccionados = [...props.seleccionados,item];
         const noSeleccionados = props.noSeleccionados.filter(valor => valor !== item)
        props.onChange(seleccionados,noSeleccionados);
        }
    
    
    const deseleccionar = (item :SelectorMultipleModel)=> {
        const seleccionados = props.seleccionados.filter(valor => valor !== item);
        const noSeleccionados = [...props.noSeleccionados, item]
       props.onChange(seleccionados,noSeleccionados);

    }
    
const seleccionarTodos = () => {
    
    const seleccionados = [...props.seleccionados, ...props.noSeleccionados];
    const noSeleccionados: SelectorMultipleModel[] = [];
    props.onChange(seleccionados,noSeleccionados);
}


const deseleccionarTodos = () => {
    
    const noSeleccionados = [...props.seleccionados, ...props.noSeleccionados];
    const seleccionados: SelectorMultipleModel[] = [];
    props.onChange(seleccionados,noSeleccionados);
}
  
    return (
        <div className='selector-multiple'>
            <ul>
                {props.noSeleccionados.map((item) =>
                    <li key={item.llave} onClick={() => seleccionar(item)}>
                        {item.valor}
                    </li>
                )}
            </ul>
            <div className='selector-multiple-botones'>
              <button type='button' onClick={seleccionarTodos}>{'>>'}</button>
              <button type='button' onClick={deseleccionarTodos} >{'<<'}</button>
            
        </div>
        <ul>
                {props.seleccionados.map((item) =>
                    <li key={item.llave} onClick={() => deseleccionar(item)}>
                        {item.valor}
                    </li>
                )}
            </ul>
        </div>
    )
}
interface formGroupSelectorMultipleProps {
    seleccionados: SelectorMultipleModel[];
    noSeleccionados: SelectorMultipleModel[];
    onChange(seleccionados: SelectorMultipleModel[],
        noSeleccionados: SelectorMultipleModel[]): void;
}


export interface SelectorMultipleModel {
    llave: number;
    valor: string;
}