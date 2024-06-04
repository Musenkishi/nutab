import { Link, LinkProps, LinkTypeMap } from "@mui/material"
import { forwardRef } from "react"

type Props = LinkProps & {}

/**
 * Automatically appends referral parameters to any provided link
 */
const NuLink = forwardRef<LinkTypeMap, Props>((props, ref) => {
  const appendReferral = (href?: string) => {
    if (href) {
      const url = new URL(href)
      const params = url.searchParams
      params.append("utm_source", "NuTab")
      params.append("utm_medium", "referral")
      return url.toString()
    } else {
      return ""
    }
  }

  return (
    <Link {...props} href={appendReferral(props.href)}>
      {props.children}
    </Link>
  )
})

export default NuLink
