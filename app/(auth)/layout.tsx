import Provider from '@Providers/Provider'
import Header from '@components/Header'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider>
            <Header hideSearch />

            {children}
        </Provider>
    )
}

export default layout