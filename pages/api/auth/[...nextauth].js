import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { supabase } from '@/lib/supabaseAdmin'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        

        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single()

        if (selectError && selectError.code !== 'PGRST116') {
          // Skip "no rows" error (PGRST116 = no rows)
          console.error('❌ Error checking user in Supabase:', selectError)
          return false
        }

        if (!existingUser) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              name: user.name,
              email: user.email,
              image: user.image,
            },
          ])

          if (insertError) {
            console.error('❌ Error inserting user into Supabase:', insertError)
            return false
          }

          
        } 

        return true
      } catch (err) {
        console.error('❌ signIn callback exception:', err)
        return false
      }
    },

    async session({ session }) {
      return session
    },
  },
})