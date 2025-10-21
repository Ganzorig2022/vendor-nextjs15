'use client'
import { MainContent } from '@/components/main-content'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const MerchantLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isMainPage = pathname === '/merchant'
  const searchParams = useSearchParams()
  const merchantType = searchParams.get('type')
  const merchantName = searchParams.get('name')

  return (
    <div className="flex">
      <main className="flex-1 h-full">
        <MainContent
          leftTitle={
            !isMainPage ? (
              <div className="flex gap-2 items-center">
                <Link href={'/merchant'}>
                  <Button variant="ghost" size="icon">
                    <MoveLeft />
                  </Button>
                </Link>
                <div>{merchantName}</div>
              </div>
            ) : (
              'Мерчантын жагсаалт'
            )
          }
          leftContent={
            merchantType ? (
              <Badge
                variant={
                  merchantType === 'PERSON' ? 'success' : 'destructive'
                }
              >
                Иргэн
              </Badge>
            ) : undefined
          }
          // rightContent={
          //   isMainPage ? (
          //     <m.div whileTap={{ scale: 0.85 }}>
          //       <Button variant="info" size="sm" disabled={loading}>
          //         {loading ? (
          //           <Loader2 className="h-4 w-4 animate-spin" />
          //         ) : (
          //           <Download className="h-4 w-4" />
          //         )}
          //         {!loading ? 'Excel татах' : 'Excel татаж байна.'}
          //       </Button>
          //     </m.div>
          //   ) : undefined
          // }
        >
          {children}
        </MainContent>
      </main>
    </div>
  )
}

const MerchantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Spinner className="mt-auto"/>}>
      <MerchantLayoutContent>{children}</MerchantLayoutContent>
    </Suspense>
  )
}

export default MerchantLayout