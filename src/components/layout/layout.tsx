import styled from 'styled-components';

const layout = (props: { children: React.ReactNode }) => {
    
    return (
        <Centering>
            {props.children}
        </Centering>
    )
}

const Centering = styled.div`
  width: 1280px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
`;

export default layout;