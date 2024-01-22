import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: notes } = await supabase.from('notes').select()
    const { data } = await supabase.auth.getSession()
    console.log(data)
    return <pre>{JSON.stringify(data)}</pre>
}